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

It feels like this will scale better, but it's not obvious here.  The logic is
all super simple, just abstract.


```js
const checkByField = (comparer) => (field) => (value, threshold) => comparer(value, threshold[field])
```
This is the kind of stuff I thought about this morning.  The values come right
at the end.  Can we rewrite this using a callback or something so we don't have
to do all partial application upfront.



// It feels like this is inverted.  Why do I have to pull this data?
const checkFieldWithinDistance = (field, distance) =>
  (value, threshold) =>
  {
    const value2 = getField(field, threshold)
    return within(distance, value, value2)
  }

const checkOverField = (field) =>
  (value, threshold) =>
  {
    const value2 = getField(field, threshold)
    return greater(value, value2)
  }

const checkEqualField = (field) =>
  (value, threshold) =>
  {
    const value2 = getField(field, threshold)
    return equal(value, value2)
  }

const checkUnderField = (field) =>
  (value, threshold) =>
  {
    const value2 = getField(field, threshold)
    return lesser(value, value2)
  }


---

After refactoring a bit, the atomic feels less awkward.  Maybe it's a smell when
you start getting really long strings of functions to preload some sort of
logic.  Instead, try and figure out what to do earlier and then feed that into
the functions.


Here's another test.

* In addition to the other rules, I want to add an odd/even prop.


So now that we've refactored a bit, how is changing it?

* If the value has the "reverseme" flag, add a "reversed" field with the name
    reveresed.


It seems like we are getting more verbose, harder to follow code.  It doesn't
seem to win like this.  I suspect this is because our "basic" version is just a
bunch of if...else.  The tradeoff is probably composability.

One last thing.

*
