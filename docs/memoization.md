## Memoization

Memoization is an optimization technique used primarily to speed up computer programs by storing the results of expensive function calls and returning the cached result when the same inputs occur again.

[Memoization](https://en.wikipedia.org/wiki/Memoization)

> The term "memoization" was coined by Donald Michie in 1968[5] and is derived from the Latin word "memorandum" ("to be remembered"), usually truncated as "memo" in the English language, and thus carries the meaning of "turning [the results of] a function into something to be remembered."

A memoized function "remembers" the results corresponding to some set of specific inputs.

Subsequent Function calls with remembered inputs return the remembered result rather than recalculating the result
Thus eliminating the primary cost of a call with given parameters from all but the first call made to the function.

A function can only be memoized if it is referentially transparent
if calling the function has exactly the same effect as replacing that function call with its return value.

*Memoization is a run-time rather than compile-time optimization.*

Memoization is heavily used in compilers for functional programming languages, which often use call by name evaluation strategy.

Memoization incurs a higher memory overhead since we must store our cached results so that we can later recall them
Therefore memoization only makes sense for functions that are computationally expensive.

[jsFiddle Memoization Example](https://jsfiddle.net/jbelmont/ane0p1ra/10/)

[ES6 Console Example](https://es6console.com/j2npui2h/)
