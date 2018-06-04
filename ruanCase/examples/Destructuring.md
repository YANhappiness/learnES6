# ES6 允许按照一定模式，从数组或对象中提取值，对变量进行复制，这被称为解构

```bash
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
```
## 等号的右边不是数组（不可遍历结构），那么将会报错

// let [foo] = 1;
// let [foo] = false;
// let [foo] = NaN;
// let [foo] = undefined;
// let [foo] = null;
// let [foo] = {};

## 对于set 结构也可以使用解构赋值

let [a1, b1, c1] = new Set([1, 2, 3]);
console.log(a1, b1, c1);

// 默认值
let [foo1 = true] = [];
console.log(foo1);

let [x1 = 1] = [undefined];
console.log(x1); // 1 

let [x2 = 1] = [null];
console.log(x2);  // null  null不严格等于 undefined 

## 如果默认值是一个表达式。那么这个表达式是惰性求值的，只有用到的时候才会求值

function F(){
    console.log("aaa");
}
let [xx = F()] = [1];

console.log(xx); // 除非被赋值为undefined否则不会调用表达式

## 默认值可以引用解构赋值的其他变量，但是该变量必须已经声明

let [x = 1, y = x] = []; // x=1; y=1
let [x = 1, y = x] = [2]; // x=2; y=2
let [x = 1, y = x] = [1, 2]; // x=1; y=2
let [x = y, y = 1] = []; // ReferenceError: y is not defined

## 对象的解构预赋值
let {foo2,bar2} = {bar2:"aaa",foo2:"bbb"};
// let {foo2:foo2,bar2:bar2} = {bar2: "aaa",foo2: "bbb"};//上面为简写形式
// 对象的解构与数组有一个重要的不同之处，数组的元素是按次数排列的，变量的取值由它的位置决定。而对象的属性没有次序，变量必须与属性同名才能取到正确的值。

## 变量名预属性名不一致情况
let {foo3:baz2,bar3} = {bar3:"aaa",foo3:"bbb"};
 //baz2 -->bbb bar3 -->aaa foo3-->is not defined

## 解构嵌套结构的对象
 let obj = {
    p:[
        "hello",
        {y:"world"}
    ]
 };

 let {p:[x,{y}]} = obj; 
 ## p为模式，不赋值。x-->hello y-->world

 let {p,p:[x,{y}]} = obj;
 // p{"hello",y:"world"}

 const node = {
     loc:{
         start:{
             line:"1",
             cloumn:"5"
         }
     }
 }

 let {loc,loc:{start,start:{line,cloumn}}} = node;
 console.log(loc,start,line,cloumn);

 // 对象解构的默认值
 {
     let {x=3} = {};  //x 3
     let {x,y=5} = {x:3};  //x 3,y 5
     let {x:y=5} = {}; // y 5
     let {x:y=3} = {y:5} //y 5
 }

 //默认值的生效条件是严格等于
 {
     let {x=3} = {x:undefined};  //x=3 
     let {x=3} = {x:null};  //x null
 }


 //已经声明的变量用于解构赋值
 {
     let x;
     {x} = {x:1}; //报错，js会将{}写在前面的理解成代码块，从而发生语法错误；

     ({x} = {x:1});   //
 }

 //由于数组本质是特殊的对象，因此可以对数组进行对象属性的解构
 let arr = [1,2,3];
 let {0:first,[arr.length - 1]:second} = arr;
 // 默认表达方式 let {0:0,[arr.length - 1]:[arr.length - 1]} = arr;
 // first arr[0]-->1     second arr[2]-->3  

 //字符串的解构赋值
 {
    const [a, b, c, d, e] = "hello";
    // a,b,c,d,e  -->h,e,l,l,o
 }

 //（类）数组对象的length属性的解构
 {
     let {length:len} = "hello";
    //  len --> 5
 }


//  数组与布尔值的解构赋值
// 解构赋值时如果等号右边是数值或者布尔值，会先转换成对象
{
    let {toString:s} = 123;
    s === number.prototype.toString

    let {toString:s} = true;
    s === Boolean.prototype.toString
}

//函数参数的解构赋值

function add([x,y]){
    return x+y;
}

add([1,2]); //3

[[1,2],[3,4]].map(([a,b])=>a+b); //[3,7]

//函数参数的解构默认值
{
    function move({x=0,y=1}={}){
        return [x,y]
    }

    move({x:3,y:8});   //[3,8]   {x:3,y:8}对等{}
    move([{x:3}]);    //[3,1] 
    move({});         //[0,1]
    move();           //[0,1]
}
// 默认值的另一种形式
{
    function move({x,y} = {x:0,y:1}){
        return [x,y];
    }

    move({x:3,y:8}); //[3,8]  {x:3,y:8} 对等 {x:0,y:1}
    move({x:3});  //[3,undefined]
    move({}); // [undefined,undefined] 
    move();  //[0,1] //采用默认值
}

//undefined null

{
    [1,undefined,null,2].map((x='yes')=>x);
    //[1,"yes",null,2]
}


//解构模式中尽量避免圆括号


// ？？？？


// 用途

{  //交换变量的值
    let x=1;
    let y=2;
    [x,y] = [y,x];
}

{ // 从函数返回多个值
    function example(){
        return [1,2,3];
    }
    let [a,b,c] = example();

    function example(){
        return {
            foo:1,
            bar:2
        }
    }
    let {foo:foo,bar:bar} = example();
}

{ // 函数参数的定义   解构赋值方便的将一组参数与变量名对应起来
    function f([x,y,z]){}
    f([1,2,3]);

    function f({x,y,z}){}
    f({z:3,y:2,x:1});
}

{ // 提取json数据
    let jsonData = {
        id:42,
        status:"ok",
        data:[866,712]
    }

    let {id,status,data} = jsonData;
}


{ // 参数的默认值
    // 没看懂
}


{ //遍历map解构
    const map = new Map();
    map.set("first","hello");
    map.set("second", "world");

    for(let [key,val] of map){
        console.log(key+" is "+val);
    }
}

{ // 输入模块的指定方法   指定引入source-mapAPI的两个方法SourceMapConsumer,SourceNode
    const {SourceMapConsumer,SourceNode } = require("source-map");
}