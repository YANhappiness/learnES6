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

## Array.of() 方法用于将一组数值，直接转化为数组
```bash
    Array.of(3,11,8) //[3,11,8]
    Array.of(3) // [3]
    Array.of(3).length() // 1
```
这个方法主要是弥补数组构造函数Array()的不足。因为参数个数的不同，会导致Array()行为的差异
```bash
    Array() //[]
    Array(3) //[,,]
    Array(3,11,8) //[3,11,8]
```
Array.of基本上可以代替Array()或者new Array(),并且不存在由于参数不同而导致的重载
```bash
    Array.of() //[]
    Array.of(undefined) //[undefined]
    Array.of(1) //[1]
    Array.of() //[1,2]
```
Array.of() 总是返回参数值组成的数组，如果没有参数就返回一个新数组

Array.of方法可以用下面的代码模拟
function ArrayOf(){
    return [].slice.call(arguments);
}

## 数组实例的copyWithin()
数组实例的copyWithin方法，在当前数组内部，将指定位置的成员复制到其他位置（会覆盖原有成员），然后返回当前数组。也就是说，使用这个方法，会修改当前数组。
Array.prototype.copyWidthin(target,start=0,end=this.length)

他接受三个参数。
- target（必须）：从该位置开始替换数据，如果是负值，表示倒数。
- start（可选）：从该位置开始读取数据，默认是0，如果是负值，则表示倒数。
- end（可选）：到该位置前停止读取数据，默认等于数组长度。如果为负值，表示倒数。

这三个参数都应该是数值，如果不是，会自动转化为数值
```bash
    [1,2,3,4,5].copyWithin(0,3)
    // [4,5,3,4,5]
```
表示将从3号位直到数值结束的成员（4，5）负值到从0号位开始的位置，结果覆盖了原来的1，2
```bash
    将从3号位复制到0号位
    [1,2,3,4,5].copyWithin(0,3,4)
    //[4,2,3,4,5]
    
    //-2相当于3号位，-1相当于4号位
    [1,2,3,4,5].copywithin(0,-2,-1)
    //[4,2,3,4,5]

    //将3号位复制到0号位
    [].copyWithin.call({length:5,3:1},0,3)   相当于 [,,,1,].copyWithin(0,3)
    //{0:1,3:1,length:5}
```
##数组实例的find() 和findIndex()
数组实例的find方法，用与找出第一个符合条件的数组成员，它的参数是一个回调函数，所有数组成员依次执行该回调函数，知道找出第一个返回值为true的成员，然后返回该成员。如果没有符合条件的成员，则返回undefined
```bash
    [1,4,-5,10].find((n=>n<0>))
    //-5
```
上面代码找出数组中第一个小于0的成员
```bash
    [1,5,10,15].find(function(value,index,arr){
        return value>9
    }) //10
```
find方法的回调函数可以接受三个参数，依次是当前的值，当前的位置和原数组
数组实例的findIndex方法的用法与find方法类似，返回第一个符合条件的数组成员的位置，吐过没有成员符合则返回-1
```bash
    [1,5,10,15].findIndex(function(value,index,arr){
        return value > 9
    }) //2
```
这两个方法都可以接受第二个参数，用来绑定回调函数的this对象
```bash
    function f(v){
        return v > this.age;
    }
    let person = {name:'Json',age:20};
    [10,12,26,15].find(f,person); //26
```
find函数接受了第二个参数person对象，回调函数中的this对象指向了person对象。

另外，这两个方法都可以发现NaN，弥补了数组的indexOf方法的不足
[NaN].indexOf(NaN);
//-1
[NaN].findIndex(y => Object.is(NaN,y))
上面的代码中，indexOf方法无法识别数组的NaN成员，但是findIndex方法可以凭借Object.is方法做到。

## 数组的fill方法
fill方法使用给定值，填充一个数组
['a','b','c'].fill(7)
// [7,7,7]

new Array(3).fill(7)
// [7,7,7]

上面的代码表明，fill方法用于将空数组初始化非常方便。数组中已有的元素，会被全部抹去
fill方法还可以接受第二个和第三个参数，用于指定填充的起始位置和结束位置。
['a','b','c'].fill(7,1,2);
 // ['a',7,'c']

如果填充的类型是对象，那么被赋值的是同一个内存地址的对象，而不是深拷贝
```bash
    let arr = new Array(3).fill({name:'Mike'});
    arr[0].name = "Ben";  //改变的是同一个内存地址
    arr 
    # [{name:"Ben"},{name:"Ben"},{name:"Ben"},]  

    let arr = new Array(3).fill([])
    arr[0].push(5); //指向同一内存地址
    arr
    # [[5],[5],[5]] 
```
## 数组实例的entries(),keys(),values()
es6提供三个新方法，--entries(),keys(),values()-- 用于遍历数组。他们都返回一个遍历器对象，可以用for...of循环进行遍历，唯一的区别就是keys()是对键名的遍历。values()是对键值的遍历，entries()是对键值对的遍历
```bash
    for(let index of ['a','b'].keys()){
        console.log(index);  //0,1
    }

    for(let elem of ['a','b'].values()){
        console.log(elem);  // a,b
    }

    for(let [index,elem] of ['a','b'].entries()){
        console.log(index,elem);
        //0 'a'
        //1 'b'
    }
```
如果不使用for...of循环，可以手动调用遍历器对象的next方法，进行遍历
```bash
    let letter = ['a','b','c'];
    let entries = letter.entries();
    console.log(entries.next().value); // [0,'a']
    console.log(entries.next().value); // [1,'b']
    conosle.log(entries.next().value); // [2,'c']
```

## 数组实例的includes()
Array.prototype.includes方法返回一个布尔值，表示某个数组是否包含给定的值，与字符串的includes方法类似。es6引入改方法
```bash
    [1,2,3].includes(2) //true
    [1,2,3].includes(4) //false
    [1,2,NaN].includes(NaN) //true
```
该方法的第二个参数表示搜索的起始位置，默认是0，如果第二个参数为负数，则表示倒数的位置，如果这时他大于数组长度，则会重置从0开始
```bash
    [1,2,3].includes(3,3); //false
    [1,2,3].includes(3,-1) //true
    # 相当于
    [1,2,3].includes(3,2) //true
```
在没有
```bash
if(arr.indexOf(el) !== -1){
    ...
}
```
 indexOf缺点
- 含义不够语义化，找到参数第一个出现的位置，
- 内部使用严格相等运算符（===）进行判断，这回导致对NaN的误判
```bash
    [NaN].indexOf(NaN) // -1
    [NaN].includes(NaN) //true
```
对不符合环境进行判断
```bash
    const contains = (()=>
        Array.prototype.includes
        ?(arr,value) => arr.includes(value)
        :(arr,value) => arr.some(el => el === value)
    )();

    contains(['foo','bar'],'baz')
```
Map和Set数据结构有一个has，需要注意与includes区别

- Map结构的has方法，是用来查找键名的，比如Map.prototype.has(key)
- Set结构的has方法，是用来查找值的，比如Set。prototype.has(value)

## 数组的空位
数组的空位是指数组的某一位置没有任何值，比如Array构造函数返回的数组都是空位
Array(3) // [,,]
值得注意的是，空位不是undefined，一个位置的值等于undefined，依然是有值的。空位是没有任何值
```bash
    0 in [undefined,undefined,undefined] //true
    0 in [,,] //false
```
上面代码说明，第一个数组的0号位置是有值的，第二个数组的0号位是没有值的。

- ES5对空位的处理，已经很不一致了，大多数情况都会忽略这个空位

- forEach(),filter(),reduce(),every()和some()都会跳过空位。
- Map会跳过空位，但会保留这个值。
- join和toString()将空位置视为undefined，而undefined和null会被处理成空字符串
```bash
    [,'a'].forEach((x,i,a) => console.log(i))  // 1
    ['a',,'b'].filter(x=> true); //["a", "b"]
    [,'a'].every(x=> x==='a'); //true  用于检测数组所有参数是否都符合规则
    [1,,2].reduce((x,y) => x+y) //3 接受一个函数作为累加器，从左到右开始计算，结果为一个值
    [,'a'].some(x => x!==a) //false 用于检测数组中是否有元素满足指定条件
    [,'a'].map(x=>1) //[,1] 返回一个数组，数组元素为函数处理过后的值

    [,'a',undefined,null].join("#") // "#a##"  undefined --> 
    [,'a',undefined,null].toString() // ",a,," undefined -->
```
ES6 则是明确将空位转为undefined
Array.from()方法会将数组的空位转为undefined，也就是说这个方法不会忽略空位
Array.from(['a',,'b'])
//["a",undefined,"b"]
拓展运算符也会将空位转化为undefined
[...['a',,'b']] // ['a',undefined,'b']
copyWithin会连为也会一起复制
[,'a','b',,].copyWithin(2,0) // [,'a',,'a']

for...of循环也会遍历空位
let arr = [,,];
for(let i of arr){
    console.log(1)
}
//1
//1

for...of并没有忽略他们，如果改成map方法会跳过空位
entries(),keys(),values(),find(),findIndex()会将空位处理成undefined
```bash
    [...[,'a'].entries()] //[[0,undefined],[1,"a"]] 
    [...[,'a'].keys()] // [0,1]
    [...[,'a'].values()] // [undefined,"a"]
    [,'a'].find(x => true) // undefined
    [,'a'].findIndex(x => true) // 0
```
由于空位的处理规则非常不统一，所以建议避免出现空位。