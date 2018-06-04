# 数组的拓展

## 拓展运算符
拓展运算符spread是三个点（...）。它好比rest参数的逆运算讲一个数组转化为用逗号分隔的参数序列
```bash
    console.log(...[1,2,3]);
    // 1 2 3
    console.log(1,...[2,3,4],5);
    // 1 2 3 4 5
    [...document.querySelectorAll('div')];
    // [<div>,<div>,<div>]
```
该运算符主要用于函数调用
```bash
    function push(array,...items){
        array.push(...items);
    }

    function add(x,y){
        return x + y;
    }

    const numbers = [4,38];
    add(...numbers) 
```
如果拓展参数是一个空数组，则不产生任何效果
[...[],1] // [1]

## 替代函数的apply方法。
由于拓展运算符可以展开数组，所以不需要apply方法，将数组转化为函数的参数
```bash
    #es5的写法
    function f(x,y,z){}
    var args = [1,2,3];
    f.apply(null,...args);

    # ES 6
    function f(x,y,z){}
    let args = [0,1,2];
    f(...args);
```
应用Math.max(),简化求出一个数组的最大元素写法， 替代apply
```bash
    // ES5 的写法
    Math.max.apply(null,[2,3,4]);

    // ES6的写法
    Math.max(...[2,3,4]);

    //等同于
    Math.max(2,3,4);
```
通过push函数，将一个数组添加到另一个数组的尾部。
```bash
    var arr1 = [0,1,2];
    var arr2 = [3,4,5];
    Array.prototype.push.apply(arr1,arr2);

    # es6
    arr1.push(...arr2);
```

new (Date.bind.apply(Date,[null,2015,1,1]));
new Date(...[2015,1,1]);

## 拓展运算符的应用
1. 复制数组
数组是复合的数据类型，直接复制的话只是复制了指向底层数据结构的指针，而不是克隆一个全新的数组。
```bash
    const a1 = [1,2];
    const a2 = a1;
    a2[0] = 2;
    a1; // [2,2];
    # a2并不是克隆a1，而是指向同一数据的指针
```
es5复制数组的方法
```bash
    const a1 = [1,2];
    const a2 = a1.concat();
    a2[0] = 2;
    a1; //[1,2]
```

拓展运算符提供了数组合并的新写法

```bash
    const a1 = [1,2];

    const a2 = [...a1];

    const [...a2] = a1;
```

2. 合并数组
```bash
    # ES5
    [1,2].concat(more);
    # ES6
    [1,2,...more]

    var arr1 = ['a','b'];
    var arr2 = ["c"];
    var arr3 = ['d','e']

    #ES5合并数组
    arr1.concat(arr2,arr2);

    #ES6合并数组
    [...arr1,...arr2,...arr3];
```

1. 与解构赋值结合
```bash
    const [first,...rest] = [1,2,3,4,5];
    first // 1
    rest //2,3,4,5

    const [first,...rest] = [];
    first // undefined
    rest // []

    const [first,...rest] = ['foo'];
    first // "foo"
    rest // []
```
如果将扩展运算符用于数组赋值，只能放在参数的最后一位，否则会报错。

4. 字符串

拓展运算符还可以将字符串转为真正的数组
```bash
    [...'hello'];
    //['h','e','l','l','o']
```

5. 实现了Iterator接口对象
任何Iterator接口对象，都可以用拓展运算符转为真正的数组
```bash
    let nodeList = docuemnt.querySelectorAll('div');
    let array = [...nodeList];
    # querySelectorAll方法返回的是一个modeList对象，他不是数组，而是一个类似数组的对象，这时拓展运算符可以将其转化为真正的数组。NodeLost对象实现了Iterator
```

6. Map和Set结构，Generator函数
拓展运算符内部调用的是数据结构的Iterator接口，因此只要具有Iterator接口的对象，都可以使用拓展运算符，比如Map结构
```bash
    let map = new Map([
        [1,'one'],
        [2,'two'],
        [3,'three'],
    ]);

    let arr = [...map.keys()] // 1,2,3
```
Generator 函数运行之后，返回一个遍历器对象，因此也可以使用拓展运算符
```bash
    const go = function*(){
        yield 1;
        yield 2;
        yield 3;
    };
    [...go()] // 1,2,3

    # 上面的代码中变量go是一个Generator函数，执行后返回的是一个遍历器对象，对这个遍历器对象执行拓展运算符，就会将内部遍历得到的值，转化为一个数组
```
