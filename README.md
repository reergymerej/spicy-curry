# spicy-curry

I want to look through a list of objects and update some value within.  Which is
more readable?

Added version-a, trying to make everything atomic.


Which is easier to extend?
* add a "perfect" status, when data is exactly a value
It sems like it was easier to add the basic version, but it _also_ seems like
the atomic version will scale better.

* If it's 7, "SEVEN".
