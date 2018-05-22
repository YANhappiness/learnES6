/*jshint esversion:6*/

//const 声明一个制度的常量，一旦声明常量的值就不能改变。声明同时初始化，不能以后赋值
//只有在所声明的块级作用域内有效

const foo = {};
foo.prop = 123;
// foo = {}; //报错

const a = [];
a.push('Hello');
a.length = 0;
// a = ['Other'];  //报错

// const实际上保证的并不是数值不能改变，而是变量指向的内存地址是不得改动的。

// ES6 6中声明类型
// var function let const import class
