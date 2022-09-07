---
title: "An Underrated Way To Learn Programming: Generative Art"
date: "7-9-2022"
---

I recently decided to learn the C programming language. The process of learning a new programming skill is nothing new to me: consume some resources and make some projects. Many people (myself included) struggle with the latter, though, the projects. Doing is essential for learning, but how do you decide what to do?

I think you can categorize common advice about projects into two groups; the first is “create something useful to you”. The second is “create something simple (\*cough\* boring) like a todo app”.

I don’t really have a problem with the first advice about creating something useful. It’s not always feasible, though. What can I possibly make as an initial project that will have real-world value to me? Most of what I find useful is quite complicated or already made. If you have an idea for a simple, useful project, then that’s ideal. These types of projects are rare, however, at least for me.

The second type of advice is more concrete, giving actual specific project ideas. There are many off-the-shelf ideas like these readily available. Examples include “todo app”, “snake game”, “pong”, etc. Again, I don’t have a major problem with this advice, except that they have been made countless times already, which can be demotivating for some people, including me.

There is another variant of this advice that focuses more on business use cases. These could include “Twitter clone”, “mock backend for CRUD app”, “responsive website for fake pizza place”, etc. I don’t know about you, but the last thing I want to create with my free time is fictitious corporate software solutions. That being said I know a lot of people enjoy making these because they resemble something you would make in the “real world”. Again, not knocking your hustle, just giving my own input. I certainly have had my fun creating all the types of projects I mentioned above.

Enough ranting. Let’s get into what this post is actually about.

## Introducing Generate Art

Look at this:

![](/images/artgen/square_rotations.png)

Isn’t that cool? I made it with a few lines of C and some math that I looked up online. The payoff, in my opinion, is huge, and the process of creating it was really fun.

This is something called Generative Art. It’s art created with the use of an autonomous system, like programming.

When creating these artworks, I find myself glued to the screen, eagerly tweaking parameters and adjusting logic to see the visual result. A refreshing change of pace from my usual way of learning, which requires a lot of self-discipline.

## You Can’t Really Do It Wrong

I created the below piece by first making a sort of rectangle “rain”, then increasingly offsetting the x-coordinate of the rectangles with random numbers.

![](/images/artgen/static_dust.png)

When I first wanted to create Generative Art, my first instinct was to watch a bunch of tutorials to learn how to do it. I found out, though, that there isn’t really anything to learn. Sure, there are a few tips and tricks but no definitive rules. All you need to know is how to draw things to the screen. The art itself is entirely up to you. You can’t do it wrong. This, in my opinion, makes Generative Art really relaxing and fun. It also makes the barrier to entry super low.

## An Underrated Way To Learn Math

I created the below piece by drawing a bunch of tangent lines around an invisible circle. Interestingly, if you draw enough tangent lines, you get the illusion of a circle but made entirely from straight lines.

![](/images/artgen/not_a_circle.png)

When creating Generative Art, I often find myself looking up math I normally wouldn’t have. The motivation of creating something cool, and the payoff when succeeding makes learning math a lot easier.

You can also approach it from the other end, where you know a mathematical concept but haven’t put it into practice. Can you actually draw a circle with `cos` and `sin`? Yes! You should try it out.

## Ideal for Beginners

A common thing I hear from people who tried picking up programming but ultimately failed is that they didn’t have the patience for it. It’s true that when starting, you usually have to invest quite some time before you can create something cool. I think Generative Art can provide an alternative that has a higher payoff with a lower investment of time.

## How To Start

The first thing I recommend you do, is watch this great talk by Tim Holman called [Generative Art Speedrun](https://www.youtube.com/watch?v=4Se0_w0ISYk).

The second step is quite straightforward, make some Generative Art. This can be done in any programming language, so pick whatever you’re comfortable with (or challenge yourself with something different). Then you just need to figure out a way to draw something in that language.

You can find the source code for my Generative Art [here](https://github.com/carltheperson/artgen).
