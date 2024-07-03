---
title: "Creating My Own Linux-Based Smart TV"
date: "2024-07-03"
---

<img src="/images/earlgreytv/front.png" alt="Front of TV" width="800px" height="598px" />

This is my absolutely awesome custom TV setup that I call "EarlGreyTV". It's the product of an experiment of mine: can I create my own functional Smart TV? The answer is yes — at least one that works for my needs.

It's powered by an old Linux-running laptop, displaying a Firefox browser in constant full-screen. The homepage in the above picture is simply an HTML file, and all the "apps" are just links to websites. Despite its simple nature, I find it quite useful. And it's able to fool non-technical people into thinking it's much more elaborate than it is :)

This is my first project involving hardware, and I had a lot of fun making it. It can't compete with off-the-shelf solutions in every way, but it definitely has advantages of its own too. I'll get into the pros and cons later.

## The Setup

Really specific details won't be provided here. If you're looking to replicate some of this yourself, you should check out [this GitHub repository](https://github.com/carltheperson/earlgreytv) which has more names, settings, scripts, and config files.

### The TV Display

I got a 55" Samsung TV on sale on Black Friday. It is itself a Smart TV, coming preloaded with Samsung Tizen OS.

I'm not here to bash other Smart TV interfaces, but the short version of why I don't like them is: tracking, ads, and lack of control.

Ideally, I would have wanted a dumber TV screen — simply showing display output. But this one was on sale, and I bought it.

I've seen people do really cool stuff, like [triggering the TV's hidden service menu](https://www.youtube.com/watch?v=LGngUs30dh0) to dumb it down completely. I might do that at some point, but for now, the regular settings could get the Tizen OS out of the way enough for me.

### Laptop

The computer powering the system is my old laptop. A couple of years ago, I accidentally spilled a cup of earl grey tea into its keyboard (hence the name EarlGreyTV). The spill only affected the keyboard though, which made it perfect for a home server.

Unfortunately, the power button is part of its keyboard. This means it's slightly difficult to turn on after being fully powered down (which I rarely do). I have to short two specific pins where the keyboard connects to the motherboard. For this reason, I have the back removed, which probably also helps it run less hot.

I've fastened the laptop to the back of the TV with some string. This may look a little insane, but it has been a great way to keep things neat while retaining access to the laptop.

<img src="/images/earlgreytv/back.png" alt="Back of TV" width="1000px" height="590px" />

### Software

On the laptop, I have Debian Linux with Sway as a desktop environment installed. I chose Sway because of how minimal and simple it is to configure with code. On login, I have Sway set up to launch Firefox in full-screen.

The Firefox instance is customized in a few ways. Its homepage is set to the EarlGreyTV HTML file. It also has visual changes to avoid revealing its browserness too much. These are done using a `userChrome.css` file, and include never showing the address bar in full-screen, and hiding other small Firefox UI features.

Among other small details, I added custom notifications that are shown when you e.g. change volume.

<img src="/images/earlgreytv/notification.png" alt="Notification" width="800px" height="704px" />

### Remote

The remote for this setup is a bit tricky. This is because the whole system is dependent on mouse and keyboard input. You have to be able to click on what you want to watch, and search for it by typing.

The obvious solution is to hook up a regular Bluetooth mouse and keyboard, but this would feel a bit clunky and un-TV-like. I needed something small and in a remote-like form factor.

I decided to go with an airmouse. These use a gyroscope/accelerometer to move the cursor in the direction you're tilting the device.

It can feel quite natural when you get used to it, but there is a tiny learning curve. If you're handed a remote that controls a cursor, your first instinct is to point the remote where you want to go. An airmouse doesn't work this way. It doesn't know *where* you're pointing, only which direction you're pointing.

I found this below airmouse (WECHIP W3), that even has a full mini keyboard at the back. It works well, although I wish it felt a bit less flimsy and lightweight.

<img src="/images/earlgreytv/remote.png" alt="Remote" width="1068px" height="791px" />

One thing that made using it ten times easier, was to set up a dedicated re-center button. Otherwise, you risk the cursor ending up at the side of the screen, without being able to provide enough tilt to bring it back.
 
### CEC Adapter

One surprisingly useful thing I got for this setup was a CEC adapter. CEC is an HDMI feature that allows devices to send commands to each other.

With CEC, I could achieve a very convenient thing: when I trigger the laptop to suspend, it also asks the TV screen to turn off. Likewise, when the laptop wakes up, it turns the TV screen back on. This solution allows for a single remote, the airmouse. Without CEC, I would need the Samsung remote to turn on/off the TV.

I had to buy a CEC USB adapter because my laptop didn't support CEC in its HDMI port. The adapter works by enriching the HDMI connection with CEC messages from a USB connection.

<img src="/images/earlgreytv/cec.png" alt="CEC adapter" width="800px" height="557px" />

### Casting from iPhone

While it's very possible to find content on the TV itself, there are cases where you have something on your phone that you want to throw up on the TV.

A simple way I found to achieve this was to create a shortcut on my iPhone. The shortcut is configured to show up in the "Share Sheet" when attempting to share a URL in any app. When the shortcut gets a URL, it sends the URL to the EarlGreyTV computer through an HTTP request.

A simple server is then listening for URLs on the TV side. When it receives one, it pastes it into the Firefox address bar.

<img src="/images/earlgreytv/casting.png" alt="Casting screenshots" width="1374px" height="800px" />

This setup allows for simple content link sharing from my phone. It's maybe a bit generous to call it casting, but it works quite well for my needs.

The implementation on the server does shatter the Smart TV illusion a little bit. It briefly makes the Firefox address bar visible when pasting a URL into it, but this is only for a few seconds.

## Pros And Cons

Let me get the biggest con out of the way first: This thing is complicated. It took me a long time to get the system to a relative state of "just works". It's usable by non-technical people, but I would never install it for someone who couldn't debug it themselves.

Another con is the remote. I've gotten very used to it, but people who try it for the first time need some instructions on how to work it.

<hr/>

Basing the whole system on a browser is something I'm very glad that I did. It made adding "apps" to the TV very easy, without worrying about updates or compatibility. I can add any app as long as it exists as a website. I can e.g. "install" Hacker News, and silly things like my "Random cat" app which uses https://cataas.com/cat. I can add shortcuts to specific parts of sites I visit frequently, like the latest news in my Danish public broadcast app (DR TV).

In general, the major pro for me is the fine-grained control I get. I'm free to script, re-program buttons, change aesthetics, etc. I also like that I can take advantage of browser extensions, to add things like ad/sponsor blockers, or set site-blocking schedules.

## Conclusion

I'd love a world where more people created custom TV setups like this, but I also realize that the vast majority of people just want something simple that works.

For me, the point of this project wasn't to create an objectively better Smart TV — I just wanted something that I would personally love to use.

I let tiny annoyances of conventional Smart TVs get to me, sucking me down a huge rabbit hole in my attempt to create something better. Going down that rabbithole was very fun, though. I barely even watch TV, and can confidently say that I've spent **way** longer *making* my TV setup than actually using it.

I guess my conclusion to this project is: Acting on the impulses to improve things that annoy you, can end up being very fun.

Oh, BTW: If you want to see the TV in action, [I recorded a short YouTube video of it](https://www.youtube.com/watch?v=836VlTPxnFc).
