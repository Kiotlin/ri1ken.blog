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

## Event Handling

```javascript
// bad
function handleClick(event) {
    const popup = document.getElementByID('popup');
    popup.style.left = event.clientX + 'px';
    popup.style.top = event.clientY + 'px';
    popup.className = 'reveal';
}

addListener(element, 'click', handleClick);
```
To address this code mainability problem, you should follow 2 rules below:

1. Seperate Application Logic
2. Don't Pass the Event Object Around 

```javascript
// good
const myApp = {
  handleClick(e) {
    // other event behavior
    e.preventDefault();
    e.stopPropagation();

    this.showPopup(e.clientX, e.clientY);
  },

  showPopup(x, y) {
    const popup = document.getElementByID('popup');
    popup.style.left = x + 'px'; // `${x}px`
    popup.style.top = y + 'px'; // `${y}px`
    popup.className = 'reveal';
  },
}

addListener(element, 'click', (event) => {
    myApp.handleClick(event);
});
```

## Detecting Primitive Values

There are 5 primitive types in JavaScript: `string`, `number`, `boolean`, `undefined` and `null`. If you are expecting a value to be a string, number, boolean, or undefined, then the typeof operator is your best option.

- For strings, typeof returns “string”.
- For numbers, typeof returns “number”.
- For booleans, typeof returns “boolean”.
- For undefined, typeof returns “undefined”.

Using typeof for detecting these four primitive value types is the safest way to code defensively.

```javascript
if (typeof name === 'string') {
    // do something
}
```

Only if you are sure that the expected value is actually `null`, then it is okay to test for `null` directly. Don't use `typeof` for a null object, which will return "object", making this an inefficient way to test for `null` values. Just make a comparison using `===` or `!==`.

```javascript
const d = document.getElementById('my-div');
if (d !== null) {
    // do something
}
```

`d` is entirely possible for `document.getElementById()` to return `null` if the given DOM element isn’t found.

## Detecting Reference Values

Using `instanceof` instead of `typeof` to detect values of a particular reference type. 

```javascript
// detect a Date
if (value instanceof Date) {
    // do something
}

// detect a RegExp
if (value instanceof RegExp) {
    // do something
}

// detect an Error
if (value instanceof Error) {
    throw value;
}
```

Also for your customized Class.

```javascript
function Person(name) {
    this.name = name;
}

let p = new Person('ri1ken');

console.log(p instanceof Person); // true
console.log(p instanceof Object); // true
```

## Detecting Function

Using `typeof` on a function will return 'functon'. Don't use `instanceof`.

```javascript
function myFunc() { }

// bad
console.log(myFunc instanceof Function);

// good
console.log(typeof myFunc === 'function'); // true
```

## Detecting Array

Using `Array.isArray()` to detect an array.

Main implementaion behind:

```javascript
function isArray(obj) {
    if (typeof Array.isArray === 'function') {
        return Array.isArray(obj);
    } else {
        return Object.prototype.toString.call(obj) === '[Object Array]';
    }
}
```

## Detecting Properties

Using the `in` operator. The `in` opertor simply checks for the presence of the named property without reading its value. 

```javascript
const value = {
    count: 0,
    related: null,
}

// good
if ('count' in value) {
    // do someting
}

if ('related' in value) {
    // do something
}

// bad: checking falsy value
if (value['count']) {
    // code here will not run
}

// bad: checking aganist null
if(value['related'] != null) {
    // code here will not run
}
```

if you only want to check for the existence of a property on the object instance, using `hasOwnProperty` method.

```javascript
if (obj.hasOwnProperty('related')) {
    // do something
}
```

## Seperate Configure Data from Code

Externalize the configration data:

```javascript
const config = {
    MSG_INVALID_VALUE: "invalid_date",
    URL_INVALID: "/errors/invalid.php",
    CSS_SELECTED: "selected",
}
```

Or, storing the data in a seperated file:

```json
//JSON
{
    "MSG_INVALID_VALUE": "invalid_date",
    "URL_INVALID": "/errors/invalid.php",
    "CSS_SELECTED": "selected",
}
```
```json
//JSONP
callback({
    "MSG_INVALID_VALUE": "invalid_date",
    "URL_INVALID": "/errors/invalid.php",
    "CSS_SELECTED": "selected",
})
```

## Distinguish Your Errors

You can create your own error type to distinguish between your own errors and browser-thrown ones.

Inherit your error type from `Error`, which allows you to provide additional information. You can create a custom error type using the following pattern:

```javascript
function MyError(msg) {
    this.message = msg;
}

MyError.prototype = new Error();
```

The big advantage of this approach is that custom error objects allow you to test specifically for your own errors:

```javascript
try {
    // some code that might cause error
} catch(e) {
    if (e instanceof MyError) {
        // handle your own error
    } else {
        // handle system error
    }
}
```

## File and Directory Structure

 1. One object per file
 2. Group related files in directories
 3. Keep 3rd-part code seperated
 4. Detemine build location
 5. Keep test code 

a populart layout:

```js
- project_name
 - build // For the final built files, shouldn't be checked in.
 - src
 - tests // It is recommended to keep the same structure with your modules directories: 'js/example.js' and 'tests/example.js'
 - docs
```

## Build Tool

The choice of a build tool is usually based on the tools familiar to the developers who will be using it. 

## Minification and Compression

## Documentation

## Automated Testing

`Ended in 2022-10-04 02:42:01`