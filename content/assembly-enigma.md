---
title: "Writing an Enigma Machine in 6502 Assembly"
date: "26-7-2022"
---

I recently decided to challenge myself by creating the infamous [Enigma Machine](https://en.wikipedia.org/wiki/Enigma_machine) in 6502 assembly. This was the first project I wrote using assembly, and this post describes the tools/resources I used to do it.

You can find the source code for the project [here](https://github.com/carltheperson/assembly-enigma).

## Motivation

I wish I could tell you that I did this to boost my professional programming abilities by expanding my knowledge of lower-level computing, but that’s not the case at all. I only really wanted to learn some assembly because, well, it sounded fun. Before this project, computers were still quite mysterious to me (they still are but less so), and I wanted to unveil some of the mystery.

My original plan was to learn C, but I thought, why not start even lower? I would certainly appreciate C more if I forced myself to learn assembly first.

## Deciding to create an Enigma Machine

So here I was. I had decided to learn assembly, but I still needed a first project to serve as a reasonable learning goal. It needed the right level of difficulty; Too easy, and I wouldn’t be challenging myself enough, but too difficult, and I probably would never finish it.

I had my eureka moment in a museum in Berlin where they had a real Enigma Machine on display. How hard could it be if they made it all using wheels and wires? It obviously wouldn’t be easy, but it seemed somewhat doable.

<img src="/images/assembly-enigma/enigma-image.jpg" alt="Enigma Machine image" style="max-width: 400px">

## Learning assembly

Before I gathered enough courage to actually learn assembly, I wanted to learn more about lower-level computing in general. I watched a really interesting video by Sebastian Lague called “[Exploring How Computers Work](https://www.youtube.com/watch?v=QZwneRb-zqA)”. It covers things like logic gates and addition/subtraction with binary.

The next thing I watched was a playlist by Ben Eater called ”[Build a 65c02-based computer from scratch](https://www.youtube.com/watch?v=LnzuMJLZRdU&list=PLowKtXNTBypFbtuVMUVXNR0z1mu7dp7eH)”. In this series, he sets up all the hardware needed to load a program into the 6502 microprocessor and then writes a “Hello World” program that interfaces with an LCD display. The series also includes lots of other interesting stuff.

At this point, I was ready to jump in, but I needed a place to start. I found myself looking at a [Reddit answer](https://www.reddit.com/r/learnprogramming/comments/5dr5yb/best_way_to_learn_assembly/) that gave some useful advice.

![Reddit answer](/images/assembly-enigma/reddit.png)

I really liked this Redditor’s suggestion of learning 6502 assembly using an emulator. I had just watched Ben Eater’s playlist where he plays with the 6502 microprocessor. This could open the possibility of running my own programs on real 6502 hardware some day.

The first real assembly resource I used was Andrew Blance’s “[Learning Assembly](https://codeburst.io/an-introduction-to-6502-assembly-and-low-level-programming-7c11fa6b9cb9)” series. It covers things like binary number representation, architecture of the 6502 microprocessor, and of course, writing 6502 assembly. It was a really nice introduction and fairly comprehensive. I kept coming back to re-read parts of it.

The next resource I used was the tiny ebook “[Easy 6502](https://skilldrick.github.io/easy6502/)” by Nick Morgan. It has the unique advantage of including a 6502 emulator in the webpage itself. If you want to play around with 6502 assembly but don’t want to spend a lot of time, this is the resource I recommend.

It’s also worth noting that I often referenced [this](http://www.6502.org/tutorials/6502opcodes.html) opt-code documentation page from 6502.org.

## Understanding Engima

The next logical step for me was to understand how an Enigma Machine works. I watched “[How did the Enigma Machine work?](https://www.youtube.com/watch?v=ybkkiGtJmkM)” by Jared Owen. It gives a really nice overview of the different Enigma components using 3D models and animations.

While creating my own Enigma Machine, I referenced “[Coding the Enigma machine - Part 1](https://www.youtube.com/watch?v=sbm2dmkmqgQ&t=243s)” by Coding Cassowary. I only really watched the beginning, which includes some very intuitive diagrams that show the path of a letter in Enigma.

## Creating the Enigma Machine

Now I was ready to dive in. The first thing I needed was a 6502 emulator. Finding one was actually harder than you might think. The main challenge was IO. I needed a way to easily input and output text. Eventually, I found the perfect emulator for this called [x6502](https://github.com/haldean/x6502). It has special memory addresses called `getc` and `putc` that allow for really convenient IO. The repository for x6502 also has some example programs, which made getting started easy.

I then started writing my Enigma Machine. Here I made a grave mistake: I didn’t fully understand how one might code an Enigma Machine before starting. I should have written a prototype in Python or JavaScript first. Coding in assembly was hard enough, so figuring out exactly _what_ to code along the way made it a lot harder.

I finally managed, however. This image shows the result:

![Example](/images/assembly-enigma/example.png)

The above image illustrates some of the magic of Enigma. Typing a letter produces a resulting letter - typing that resulting letter (with the same rotor settings) produces the original letter. There is no need to explicitly state whether you are encrypting or decrypting.

If you’re curious about what the code for this program looks like, here is a little taste:

```
start_indexing:
	CLC
index1: ; --- Take typed char and get placement on rotor1 with offset.
	LDA getc
	SBC #$5F ; Converting the letter to a number. e.g. a=1, b=2, z=26
	CLC
	ADC r1offset ; Adding offset. Now we have a number between 2 and 52
	TAX
	ADC #$65 ; Done to potentially overflow. Will overflow if > 25
	BVC done1 ; If not overflovn
	TXA
	SBC #$19 ; If overflown (number > 25); Subtract 25 from original number
	CLC
	TAX
done1:
	CLC
	LDA r1start, x ; Extract position on rotor using now offset number
	SBC #$5F ; Converting the letter to a number. e.g. a=1, b=2, z=26
	CLC
```

The above code contains some weird comparison logic; I overflow a byte to compare if a number is greater than 25. This is because the x6502 emulator had an issue with the standard way of comparing if a number is greater than another (`CMP`).

I also never really found out how to write reusable bits of code (I had issues using the `RTS` “Return from subroutine” instruction). The result is a codebase with a lot of copy-paste.

Finally, I decided to omit the plugboard (a component of Enigma that swaps letters without rotation). It seemed like the least complex and boring component. Also, I’m pretty sure the wheels in my Enigma Machine rotate backward, oh well, it works.
