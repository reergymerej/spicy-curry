# spicy-curry

I want to look through a list of objects and update some value within.  Which is
more readable?

Added version-a, trying to make everything atomic.


Which is easier to extend?
* add a "perfect" status, when data is exactly a value
It sems like it was easier to add the basic version, but it _also_ seems like
the atomic version will scale better.

* If it's 7, "SEVEN".

That was still harder in atomic.  It's hard to understand what things are doing,
so hard to figure out if I can reuse things or not.  It _sorta_ feels like still
creating framework, though.  Let's try some more.

* If it's 3, "THREE".

This was still easier in basic, but not as bad in atomic.  It seems like we've
got more work in atomic because things are needlessly "normalized."  If we're
duplicating, that's one thing, but we've got a lot of named functions that are
used once we could just inline.

I'm going to inline some of these and try this again.

Inlining calls that have concrete values seems like a good idea.


```js
const add = (a, b) => a + b
const subtract = (a, b) => a - b
const getAdder = (a) => (b) => add(a, b)
const getSubtractor = (a) => (b) => subtract(a, b)

const add5 = getAdder(5)
const add3 = getAdder(3)
const subtract99 = getSubtractor(99)

console.log(add5(100))
console.log(add3(100))
console.log(subtract99(100))
```

vs

```js
const add = (a, b) => a + b
const subtract = (a, b) => a - b

console.log(add(5, 100))
console.log(add(3, 100))
console.log(subtract(99, 100))
```

Seems like all we're doing is currying shit for no real reason.  If we are
doing it for reuse, that's one thing.  Otherwise, just inline it.  There's no
need in creating the overhead of such narrowly defined functions.

Let's try again and see how it feels.

* If it's 9, "NINE".
* "PERFECT" takes priority.


The gap is narrowing.  It felt about the same for each.

This may be because of the simplicity of the logic.  Let's try something a bit
different.

* If we're within 1 of "PERFECT", "ALMOST_PERFECT".
