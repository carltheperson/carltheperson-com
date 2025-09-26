---
title: "I Like Packing Multiple Services Into One Rust Binary"
date: "2025-09-26"
---

This post explains a trick I enjoy doing in Rust: shove multiple different services into the same output binary. Is this a good idea to do? In general, no. But for smaller, maybe internal projects, it can be nice to have the ultra-simplified deployment.

I feel that personal/team headaches correlates directly with the number of separate deployment mechanisms you need to maintain. This is a strategy I like when scope/setup allows for it.

To illustrate what I mean, I'll create an example server in this post. It will be responsible for the following things:

- REST API
- Database
- Frontend serving
- TLS certificate management

The reference code can be [found here](https://github.com/carltheperson/rust-one-binary-poc).

## REST API

Pretty common thing to have in your binary. I prefer [`axum`](https://crates.io/crates/axum) for this.

## Database

In this project, I use [`sled`](https://crates.io/crates/sled) (think similar use cases as SQLite). It's a simple, pure-Rust, embeddable database.

## Frontend serving

No CDN for us. Our backend will serve the frontend, just as it does with the REST endpoints.

What's more, our static frontend files won't be in some `static/` directory next to our binary - they will be inside the binary. Specifically, the `.rodata` section. 

There's an awesome crate called [`rust-embed`](https://crates.io/crates/rust-embed) that helps us with this. We'll use it to embed our frontend build directory at compile-time.

Inspecting the binary shows the embedded minified JavaScript with filenames:

![JS XXD](/images/rust-one-binary/js-xxd.png)

Svelte is my frontend tool of choice, and I'll be using it for this project. Its static SPA builds are excellent, even handling dynamic routes like `/items/[id]/sub/[sub_id]/[...more]` without a special server. You can't do that with Next.js.

This snippet has the handler I'll be using to serve the frontend:

```rust
#[derive(Embed)]
#[folder = "./frontend/build"]
struct Assets;

#[tokio::main]
async fn main() {
    let db = open_db();
    let state = AppState { db: Arc::new(db) };

    let app = Router::new()
        .route("/api/items", get(list_items))
        .route("/api/items/{id}", get(single_item))
        .with_state(state)
        .fallback(static_handler);
    let listener = tokio::net::TcpListener::bind("0.0.0.0:3000").await.unwrap();
    axum::serve(listener, app).await.unwrap();
}

async fn static_handler(uri: Uri, headers: HeaderMap) -> impl IntoResponse {
    let path = uri.path().trim_start_matches('/');

    let accept = headers
        .get(header::ACCEPT_ENCODING)
        .and_then(|v| v.to_str().ok())
        .unwrap_or("");

    // SvelteKit puts hashed files in `/_app/immutable/` (safe to cache forever)
    // E.g.: `/_app/immutable/chunks/1D3s5Tee.js`
    let immutable = path.starts_with("_app/immutable/");

    let candidates = if immutable {
        // Build has pre-compressed files e.g.: 1D3s5Tee.js, 1D3s5Tee.js.br, ...
        let mut v = Vec::with_capacity(3);
        if accept.contains("br") {
            v.push(format!("{path}.br"));
        }
        if accept.contains("gzip") {
            v.push(format!("{path}.gz"));
        }
        v.push(path.to_string());
        v
    } else {
        vec![path.to_string()]
    };

    if let Some((name, content)) = candidates
        .into_iter()
        .find_map(|p| Assets::get(&p).map(|c| (p, c)))
    {
        let mime = mime_guess::from_path(path).first_or_octet_stream();
        let mut builder = Response::builder()
            .header(header::CONTENT_TYPE, mime.as_ref())
            .header(header::VARY, "Accept-Encoding");

        if immutable {
            builder = builder.header(header::CACHE_CONTROL, "public, max-age=31536000, immutable");
        }

        for (suffix, enc) in [(".br", "br"), (".gz", "gzip")] {
            if name.ends_with(suffix) {
                builder = builder.header(header::CONTENT_ENCODING, enc);
                break;
            }
        }

        return builder.body(Body::from(content.data)).unwrap();
    }

    // SPA fallback
    match Assets::get("index.html") {
        Some(content) => Html(content.data).into_response(),
        None => (StatusCode::NOT_FOUND, "404").into_response(),
    }
}
```

## TLS certificate management

To have encrypted, trusted connections to our server, we need HTTP over TLS (`https://...`). But this requires a way to manage certificates and their renewal. 

Typically, you'd use [Certbot](https://github.com/certbot/certbot) for this. However, it's written in Python and runs outside our server, so that's out.

Instead, we'll be using the awesome crate [`rustls-acme`](https://crates.io/crates/rustls-acme). It will work with our `axum` web server to request, cache, and renew certificates.

To play with this, I mapped `app.test` to `127.0.0.1` in my `/etc/hosts`. Then, to test the ACME exchange locally, I used [`pebble`](https://github.com/letsencrypt/pebble) to issue challenges to my server.

You can see how my main function changed here:

```rust
#[tokio::main]
async fn main() {
    let root_cert = include_bytes!("../pebble.minica.pem");
    let mut root_store = rustls::RootCertStore::empty();
    let cert = rustls_pemfile::certs(&mut root_cert.as_slice())
        .next()
        .expect("Failed to parse certificate")
        .expect("No certificate found");
    root_store
        .add(cert) // We only trust Pebble for this test
        .expect("Failed to add certificate to root store");
    let client_config = rustls::ClientConfig::builder()
        .with_root_certificates(root_store)
        .with_no_client_auth();

    let mut acme_state = AcmeConfig::new(vec!["app.test".to_string()])
        .cache_option(Some(DirCache::new("./data/acme")))
        .directory("https://localhost:14000/dir") // We expect Pebble to run here
        .client_tls_config(Arc::new(client_config))
        .challenge_type(Http01)
        .state();

    let acceptor = acme_state.axum_acceptor(acme_state.default_rustls_config());
    let acme_challenge_tower_service: TowerHttp01ChallengeService =
        acme_state.http01_challenge_tower_service();

    tokio::spawn(async move {
        loop {
            match acme_state.next().await.unwrap() {
                Ok(ok) => println!("event: {:?}", ok),
                Err(err) => println!("error: {:?}", err),
            }
        }
    });

    let db = open_db();
    let state = AppState { db: Arc::new(db) };

    let app = Router::new()
        .route("/api/items", get(list_items))
        .route("/api/items/{id}", get(single_item))
        .with_state(state)
        .route_service(
            "/.well-known/acme-challenge/{challenge_token}",
            acme_challenge_tower_service,
        )
        .fallback(static_handler);

    let http_addr = SocketAddr::from((Ipv6Addr::UNSPECIFIED, 80));
    let https_addr = SocketAddr::from((Ipv6Addr::UNSPECIFIED, 443));

    let http_future = bind(http_addr).serve(app.clone().into_make_service());
    let https_future = bind(https_addr)
        .acceptor(acceptor)
        .serve(app.into_make_service());

    try_join!(https_future, http_future).unwrap();
}
```

It's honestly nice having such simple control over a process that usually requires a managed solution because it's so cumbersome.

I imported Pebble’s certificate authority (CA) into Firefox to view my frontend in its full trusted HTTP**S** glory:

![HTTPS demo](/images/rust-one-binary/https-glory.png)

## Binary sizes

For fun, I decided to record how my binary beefed up over time.

- `1.5M` - barebones `axum` hello world
- `2.5M` - added `sled` and `serde` for data storage and serialization
- `2.9M` - added static file serving (`frontend/build/` was `356K`)
- `8.5M` - added certificate management
- `4.5M` - after applying [size-optimization tricks](https://github.com/johnthagen/min-sized-rust)

This was without scrutinizing `Cargo.toml` or trimming dependencies.

## Some other ideas

Why stop here? More things could be packed into the binary:

- If you don't like sharing, you could statically link `libc`
- Since you're already stateful with the DB, you could add a message broker to ingest jobs/events
- [Cat videos](https://youtu.be/1AnrasgflFc) as a courtesy to people reverse engineering your server
- A tiny AI inference engine with a baked-in model file
- A container runtime and the `.tar` files of your favorite containers
- Whole Chromium buil... (no, let's resist this one)

## Conclusion

My Rust binaries will continue to absorb more responsibilities over time, and no one can stop me.