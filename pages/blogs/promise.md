---
title: 'Promise - an implementation'
date: 2022-08-30 02:08:18
author: ri1ken
description: A date structure of JS Promise implemented by Lee
---

```Javascript
const PENDING = 'Pending';
const FULLFILL = 'FullFilled';
const REJECT = 'Rejected';

class Promise {

    status = PENDING;

    value = null;
    reason = null;

    onResolvedCallback = [];
    onRejectedCallback = [];

    constructor(exec) {
        try {
            exec(this.resolve, this.reject);
        } catch (e) {
            this.reject(e);
        }
    }

    resolve = (value) => {
        if (this.status === PENDING) {
            this.status = FULLFILL;
            this.value = value;
        }
        while (this.onResolvedCallback.length) {
            this.onResolvedCallback.shift()(value);
        }
    }

    reject = (reason) => {
        if (this.status === PENDING) {
            this.status = REJECT;
            this.reason = reason;
        }
        while (this.onRejectedCallback.length) {
            this.onRejectedCallback.shift()(reason);
        }
    }

    then = (onResolved, onRejected) => {
        function resolvePromise(res, resolve, reject) {
            if (res instanceof Promise) {
                res.then(resolve, reject);
            } else {
                resolve(res);
            }
        }

        return new Promise((resolve, reject) => {
            if (this.status === FULLFILL) {
                const temp = onResolved(this.value);
                resolvePromise(temp, resolve, reject);
            }
            if (this.status === REJECT) onRejected(this.reason);
            if (this.status === PENDING) {
                this.onResolvedCallback.push(onResolved);
                this.onRejectedCallback.push(onRejected);
            }
        })
    }
}

module.exports = Promise;
```