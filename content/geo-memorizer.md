---
title: "Making a Game to Memorize facts about every country"
date: "6-11-2021"
---

![Image of game](/images/geo-memorizer/cover.png)

### I recently made a small web app called Geo Memorizer. The purpose was to help me memorize the name, flag, and location of every country in the world.

## The game

The game features a big world map, with a little prompt in the corner presenting the facts. There are two modes in the game. _Memory mode_ and _recall mode_. In memory mode, you are supposed to remember all three facts (name, flag, and location) presented about the country. Later in recall mode, you will be asked to recall **one** of the facts. If you recall correctly, you get a point. If you don't, you lose all your points.

![Modes in game](/images/geo-memorizer/modes-preview.png)

There is a 5 country buffer between when you are asked to memorize a country, and when you are asked to remember a fact about it. I found that buffer to be the sweet spot because it forces you to recall right before you forget.

The game turned out to be pretty fun. The risk of losing all your points if you forget one fact is a good motivator.

## Motivation

I have always thought of myself as someone with a bad memory but it was never something I tried to confirm or disprove. Remembering a bunch of things just for the sake of remembering them could be a pretty good way to test it. Remembering facts about every single country in the world seemed challenging enough that it would be difficult, but easy enough to be actually possible.

And so I began my search to find a good geography memory game. Many of them were quiz-based. But I was looking to actually learn the facts, not just test myself in them. I was also annoyed by the fact that many of them required me to create an account (or even worse, sign up with Facebook). I wanted a simple web app with no downloading, popups, or ads.

After searching for a bit I decided to create my own game. Although to be honest I didn't search that long. I thought the idea of creating my own game seemed pretty fun.

## Making the game

The game was fairly simple to make. It was mostly just combining already existing libraries and data.

I wrote the game with TypeScript and didn't use any fancy frameworks for rendering, just plain old DOM manipulation. I used [d3.js](https://github.com/d3/d3) and [d3-geo](https://github.com/d3/d3-geo) to render the map, which made adding things like panning and zooming super easy. The map came from [naturalearthdata.com](http://naturalearthdata.com/) which is a collection of map data in the public domain.

You can find the code for the game [here](https://github.com/carltheperson/geo-memorizer) and the actual game [here](https://geo-memorizer.web.app/).

## Conclusion

I found that using my game was a relatively time efficient way to memorize basic geography facts for many countries. I also often found myself deep in Wikipedia pages when I encountered countries I had never seen before. I haven't quite reached my goal of learning every country in the world, but it feels within reach.

Although playing the game is fun, it was way more fun to make it. It was really satisfying to create an alternative for myself after being frustrated by similar existing apps. It was fun creating it just for me, without having to consider the requirements of other potential users. I encourage anyone with an idea for an app to start making it. Make an app for yourself. Forget about creating a million dollar success, or creating something just to impress future employers. It's boring.
