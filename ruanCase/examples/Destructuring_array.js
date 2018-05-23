/*jshint esversion:6*/

//ES6 允许按照一定模式，从数组或对象中提取值，对变量进行复制，这被称为解构

let [a, b, c] = [1, 2, 3];
console.log(a);

let [foo, [
    [bar], baz
]] = [1, [
    [2], 3
]];
console.log(bar);

let [head, ...tail] = [0, 1, 2, 3, 4]; //...解构符号
console.log(tail); // [1, 2, 3, 4]

let [x, y] = [1];
console.log(y); //undefined 解构值不匹配就是undefined

//等号的右边不是数组（不可遍历结构），那么将会报错

// let [foo] = 1;
// let [foo] = false;
// let [foo] = NaN;
// let [foo] = undefined;
// let [foo] = null;
// let [foo] = {};

// 对于set 结构也可以使用解构赋值

let [a1, b1, c1] = new Set([1, 2, 3]);
console.log(a1, b1, c1);

// 默认值
let [foo1 = true] = [];
console.log(foo1);

let [x1 = 1] = [undefined];
console.log(x1); // 1 

let [x2 = 1] = [null];
console.log(x2);  // null  null不严格等于 undefined 

// 如果默认值是一个表达式。那么这个表达式是惰性求值的，只有用到的时候才会求值

function F(){
    console.log("aaa");
}
let [xx = F()] = [1];

console.log(xx); // 除非被赋值为undefined否则不会调用表达式

// 默认值可以引用解构赋值的其他变量，但是该变量必须已经声明
let [x = 1, y = x] = []; // x=1; y=1
let [x = 1, y = x] = [2]; // x=2; y=2
let [x = 1, y = x] = [1, 2]; // x=1; y=2
let [x = y, y = 1] = []; // ReferenceError: y is not defined
 
