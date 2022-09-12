# [iken.moe](https://iken.moe)

Hope this could be the final version of my personal blog.

Commit Syntax 
```javascript
// 'b': 'blog', 'd': 'daily'
const postStyle = 'b' || 'd'; 

// 'a': 'appended', 'm': 'modified'
const action = 'a' || 'm'; 

const syntax = {
    // b+, d+
    [`${postStyle}+`]: `add new ${postStyle} post`,
    // b::a, b::m, d::a, d::m
    [`${postStyle}::${action}`]: `${postStyle} post ${action}`,
}
```
Fast commit saved my time.

---

Appreciated with [@shuding](https://github.com/shuding) 
