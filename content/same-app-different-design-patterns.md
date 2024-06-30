---
title: "Same App Different Design Patterns"
date: "2021-09-19"
---

### What's the best way to learn software design patterns well? I think it's by implementing them, so I created the same app using four different design patterns

Software design patterns are reusable solutions to commonly occurring problems. They can be a huge advantage when designing software and can minimize the risk of your app turning into a huge mess. My idea for effectively learning different common design patterns was to create the same app multiple times using a different design pattern each time.

I mainly used [this](https://www.oreilly.com/library/view/software-architecture-patterns/9781491971437/) book which has all of its chapters available online. The book is called _Software Architecture Patterns by Mark Richards._

## The App

The app needed to be something pretty simple while still having some distinctive business logic. The app I came up with was a pet cuteness ranker. It allows you to upload a picture of your pet and have strangers give it cuteness points. You also see a global leader board where all pets are ranked based on the total cuteness points.

To minimize complexity I didn't implement any authentication. In other words, you can spam upvote your pet, and nothing is stopping you.

![App preview](/images/same-app-different-design-patterns/app-preview.gif)

_All versions of the app can be found in [this GitHub repository](https://github.com/carltheperson/same-app-different-design-patterns)_

## Layered Architecture

[E-book chapter link](https://www.oreilly.com/library/view/software-architecture-patterns/9781491971437/ch01.html), [App source Link](https://github.com/carltheperson/same-app-different-design-patterns/tree/main/layered-architecture)

This is definitely the most common design pattern and is often used as the go-to pattern when in doubt. It's fairly easy to implement. The most important thing to remember is the direction dependencies point. The upper layers depend on the lower ones, not the other way around.

![Layered Architecture diagram](/images/same-app-different-design-patterns/layered.png)

File structure:

```text
layered-architecture/
├─ presentation/
├─ business-logic/
├─ persistence/
```

## Event-Driven Architecture

[E-book chapter link](https://www.oreilly.com/library/view/software-architecture-patterns/9781491971437/ch02.html), [App source link](https://github.com/carltheperson/same-app-different-design-patterns/tree/main/event-driven-architecture)

This is a very decoupled form of architecture used often in distributed systems. The advantage is the scalability that comes with the single-purpose event processing components.

I didn't split my app into multiple instances but used an in-memory event emitter.

Here I created two processes. The first is the voting process which increases or decreases the points of a pet depending on the vote type. The other is the ranking process which calculates the leader board rank of each pet and stores it in the database. In the current app, the ranking process is quite overkill since the number of points for a pet basically is their rank (the pet with the highest amount of points has the highest rank). This design would be more useful if the ranking was more complicated.

![Event-Driven Architecture diagram](/images/same-app-different-design-patterns/event-driven.png)

File structure:

```text
event-driven-architecture/
├─ presentation/
├─ ranking-process/
├─ voting-process/
├─ persistence/
```

## Microkernel Architecture

[E-book chapter link](https://www.oreilly.com/library/view/software-architecture-patterns/9781491971437/ch03.html), [App source link](https://github.com/carltheperson/same-app-different-design-patterns/tree/main/microkernel-architecture)

This is a very extendable design pattern that is often used in downloadable software products. The idea is that you have a core system (the microkernel) that contains only the minimal functionality required to run the app. Then you can extend the app with pluggable components. To implement this in my own app I needed a feature to extend the program. That ended up being a simple dashboard where you can see a history of the upvote/downvote events.

![Microkernel Architecture diagram](/images/same-app-different-design-patterns/microkernel.png)

![Event history dashboard](/images/same-app-different-design-patterns/event-history-dashboard.png)

File structure:

```text
microkernel-architecture/
├─ micro-kernel/
│  ├─ presentation/
│  ├─ ranking-process/
│  ├─ voting-process/
│  ├─ persistence/
├─ plug-in-components/
│  ├─ event-history-dashboard/
│  │  ├─ presentation/
│  │  ├─ business-logic/
│  │  ├─ persistence/
```

## MVC Architecture

[freeCodeCamp blog post](https://www.freecodecamp.org/news/the-model-view-controller-pattern-mvc-architecture-and-frameworks-explained/), [App source link](https://github.com/carltheperson/same-app-different-design-patterns/tree/main/mvc-architechture)

This is a very common design pattern mostly used in object oriented-programming languages. It stands for _Model View Controller._ The model is for the data logic, the view is the user interface, and the controller ties them both together and is considered the brain of the application.

This design pattern was fairly new to me and I was confused about where to put the actual business logic. Turns out it's in the model as explained in [this answer](https://softwareengineering.stackexchange.com/a/165446).

![MVC Architecture](/images/same-app-different-design-patterns/mvc.png)

File structure:

```text
mvc-architecture/
├─ views/
├─ controllers/
├─ models/
```
