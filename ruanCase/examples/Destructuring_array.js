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

let [head, ...tail] = [0, 1, 2, 3, 4];  //...解构符号
console.log(tail);