---
title: "Making a magical TypeScript cheat sheet"
date: "12-19-2021"
coverImageUrl: "/images/magic-typescript/cover.png"
coverImageWidth: "931"
coverImageHeight: "464"
---

I recently made a pretty big TypeScript cheat sheet called _“Magic TypeScript: A cheat sheet of TypeScript’s most important/magic features”_. This post covers the backstory behind it.

![cheat sheet (small)](/images/magic-typescript/small.png)

You can view the [full-size image here](/images/magic-typescript/magic-typescript.png). I also made a GitHub repository for it [here](https://github.com/carltheperson/magic-typescript).

## Motivation

A long time after learning TypeScript, I still hadn't explored it very much. I was only using the most basic of its functionality. I didn't know about all the cool features I was missing out on. I was blindly copying types I found on Stack Overflow, like this one that allows you to make all properties in an object optional except one.

```ts
type AtLeast<T, K extends keyof T> = Partial<T> & Pick<T, K>;
```

Why does it work? I had no idea. To me, this was magic. If I wanted to create a complicated type that was not already on Stack Overflow, I was lost.

That’s when I decided to read [“Effective TypeScript” by Dan Vanderkam](https://www.amazon.com/Effective-TypeScript-Specific-Ways-Improve/dp/1492053740/), a great book that I recommend any TypeScript-interested person to read. It gave me a really solid foundation for TypeScript concepts. But the book was more about TypeScript programming as a whole and not so good if you just want a very quick overview/refresher for a certain syntax. So I decided to create my ideal TypeScript quick-reference.

## Making the sheet

I started by mapping out every subject I wanted to cover. I then, for each subject, looked up in Effective TypeScript and the TypeScript Handbook to make sure I fully understood it. I then played around in the TS Playground until I had an example I liked. I also used Stack Overflow and the TypeScript lib file _lib.es5.d.ts_ as a reference. The cheat sheet itself is made with Figma, and the code snippets are made with Carbon.

Why did I create it as one big sheet and not multiple PDF pages? To me, zooming in and exploring a large image can be a more fun way to delve into content like this. Of course, that unfortunately makes it much harder to print on paper if that’s something you fancy.

## What I put in the sheet

The cheat sheet starts off with what I believe is the most important concept of TypeScript. That types are sets of values. I then describe when you can use a type in place of another.

![Example](/images/magic-typescript/example.png)

I then go on to cover:

- Inference
- Type guards
- Unions
- Intersections
- Enums
- Index signatures
- Generics
- Conditional types
- `typeof`
- `keyof`
- Template literal types
- Tuples
- `readonly`
- Useful global utility types

I think a breakdown of the global utility types is especially helpful, considering many people think of them as very complicated and mysterious, when they are in fact, very simple.

I, of course, also made sure to include lots of code examples, which I think are even more critical to understanding than the text explaining them.

## Who is this sheet for?

Short answer, anyone. Longer answer, you should probably have some initial knowledge of TypeScript programming to get the most out of it. Reason being that I don’t go into the very basics like JavaScript vs TypeScript, compiling, or running. Learning a new programming language with a cheat sheet also sounds like a very bad idea. You have to take your time.
