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

## Array.from()
    Array.from()将两类对象转化为真正的数组，类似数组的对象（array-like object：arguments可遍历的对象。iterable）包括es6新增的对象，set、map

```bash
    let arrayLike = {
        '0':'a',
        '1':'b',
        '2':'c',
        length:3
    }

    # es5 
    var arr1 = [].slice.call(arrayLike);

    # es6
    var arr2 = Array.from(arrayLike);

    # ['a','b','c']
```

常见的类似数组的对象时DOM操作返回的Nodelist集合，以及函数内湖的arguments对象。Array.from都可以讲她转为真正的数组。

```bash
    let ps = document.querySelectorAll("p");
    Array.from(ps).filter(p=>{
        return p.textContext.length > 100;
    })

    //arguments对象

    function foo(){
        var args = Array.form(arguments);
        //...
    }
```
只要部署了Iterator接口数据结构，Array.from都能将其转化为数组

```bash
    Array.from("hello");
    // ['h','e','l','l','o']

    let namesSet = new Set(['a','b']);
    Array.from(namesSet); // ['a','b']
```
如果参数是一个真正的数组，Array.from()会返回一个一模一样的数组
```bash
    Array.from([1,2,3]);
    // ['1','2','3']
```
 拓展运算符（...），也可以将某些数据转化为数组

```bash
    #arguments 对象
    function foo(){
        const args = [...arguments];
    }

    # NodeList对象
    [...document.querySelectAll('div')]
```
任何有length属性的对象，都可以通过Array.from()方法转化为数组，而此时拓展运算符就无法转化
```bash
    Array.from({length:3});
    // [undefined,undefined,undefined]
```
对于没有部署该方法的浏览器，可以用Array.prototype.slice()方法代替。
```bash
    const toArray = (()=>
        Array.from?Array.from:obj = >[].slice.call(obj)
    )();
```
Array.from还可以接受第二个参数，作用类似于数组的map方法，用于对每个元素进行处理，将处理后的值放入返回的数组。
```bash
    Array.from(array.Like,x => x*x);
    // 等同于
    Array.from(array.Like).map(x=>x*x);

    Array.from([1,2,3],(x)=>x*x);
    //[1,4,9]
```
取出一组DOM节点的文本内容

```bash
    let spans = document.querySelectorAll('span.name')
    # map()
    let names1 = Array.prototype.map.call(spans,s => s.textContent);
    # Array.from()
    let names2 = Array.from(spans,s => s.textContent)
```
将数组中布尔值为false的成员转为0.
```bash
Array.from([1,,2,,3],(n)=>n||0)
//[1,0,2,0,3]
```
另一个例子是返回各种数据的类型
```bash
    function typeOf(){
        return Array.from(arguments,value => typeof value)
    }
    typeOf(null,[],NaN)
    // ['object','object',number]
```

Array.from()
```bash
    Array.from({length:2},()=>'jack');
    # ['jack','jack']
    
    function countSymbols(string){
        return Array.from(string).length;
    }
``` 

