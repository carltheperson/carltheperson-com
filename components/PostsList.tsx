import Link from "next/link"

export function PostsList(props) {

    let posts = process.env.posts
    
    posts = posts.sort((post1, post2) => {
        const date1 = post1.date
        const date2 = post2.date
        if (new Date(date1.split("-")[0], date1.split("-")[1]-1, date1.split("-")[2]).getTime() < 
            new Date(date2.split("-")[0], date2.split("-")[1]-1, date2.split("-")[2]).getTime()) {
            return 1
        } else {
            return -1
        }
        return 0
    })

    return (
        <div>
            <ul>
                {
                    posts.map((post) => {
                        return (<li key={post.urlName}>
                            <Link href={"/posts/" + post.urlName}>
                                <a>{post.title} - {post.date}</a>
                            </Link>          
                        </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}