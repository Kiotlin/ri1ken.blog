---
type: blog
title: 'Maintainable Js'
date: 2022-09-12 03:28:56
author: ri1ken
description: Note taking for "Maintainable JavaScript -- Nicholas C. Zakas"
---

## Immediate Function Invocation
```javascript
// bad
let value = function() {
    
    // function body

    return {
        message: "hi",
    };
}();

// good
let value = (function() {

    // function body

    return {
        message: "Hi",
    };
}());
```

## Equality

Avoiding `==` or `!=` at all, instead, using `===` and `!==`.

