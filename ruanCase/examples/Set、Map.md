# Set 和Map数据结构

ES6提供了新的数据结构Set、它类似于数组，但是成员的值都是唯一的，没有重复的值。

Set本身是一个构造函数，用于生成Set数据结构。

```bash
    const s = new Set();
    [2,3,4,5,4,5,2,2].forEach(x=>s.add(x));

    for(let i of s){
        console.log(i);
    }
```
上面代码通过add方法向set结构加入成员，结果表明set结构不会添加重复的值。
set函数可以接受一个数组，作为参数，用来初始化

```bash
    const set new Set([1,2,3,4,4]);
    [...set]
    # [1,2,3,4]

    const items = new Set([1,2,3,4,5,5,5,5]);
    items.size //5

    const set = new Set(document.querySelectorAll('div'));
    set.size // 21
```

上面代码中，1，2都是Set函数接受数组作为参数。3是接受类似数组的最想作为参数

<!-- 去除数组重复成员 -->
[...new Set(array)]

向Set加入值的时候，不会发生类型转换，所以5和"5"是两个不同的值

```bash
    let set = new Set();
    let a = NaN;
    let b = NaN;
    set.add(a);
    set.add(b);
    set //Set{NaN}
```
    上面代码向Set实例添加了两个NaN，但是只能加入一个，这表明在set内部，两个NaN是相等的
    NaN === NaN

两个对象总是不相等的。

```bash
    let set = new Set();
    set.add({});
    set.size // 1

    set.add({});
    set.size // 2
```


## set 实例的属性和方法

set结构的实例有以下属性
    - set.prototype.constructor: 构造函数，默认就是Set函数
    - set.prototypr.size : 返回set实例的成员总数

set实例的方法，分为两个大类，操作方法用于操作数据和遍历方法
    - add（value） ： 添加某个值，返回set解构本身
    - delete（value）：删除某个值，返回一个布尔值表示是否删除成功
    - has（value） ： 返回一个布尔值，表示该值是否为set成员
    - clear（）： 清除所有成员，没有返回值。

```bash
    let s = new Set(); 
    s.add(1).add(2).add(2)
    s.size // 2
    s.has(1) // true
    s.has(2) // true
    s.has(3) // false
    s.delete(2);
    s.has(2) // false
```

下面是一个对比，在是否包括一个键上面，Object、Set的写法迥异。

```bash
    const properties = {
        'width' : 1,
        'height' : 1
    }

    if(properties[name]){
        ...
    }

    #set
    const properties = new Set();
    properties.add('width');
    properties.add('height');

    if(properties.has(name)){
        ...
    }
```

Array.from() 可以将Set解构转化为数组
Array.from() 从一个类似数组或可迭代对象中创建一个新的数组实例

```bash
    const items = new Set([1,2,3,4,5]);
    const array = Array.from(items);
```

这就提供了去除数组重复成员的另一种方法

```bash
    function dedupe(array){
        return Array.from(new Set(array));
    }

    dedupe([1,1,2,3]);
```

遍历操作
    set结构的实例有四种遍历方法，可以用于遍历成员

    -keys() : 返回键名的遍历器
    -values() : 返回键值的遍历器
    -entries() : 返回键值对的遍历器
    -forEach() ： 使用回调函数遍历每个成员

需要特别指出的是，Set的普遍顺序就是插入顺序，这个特性有事非常有用，比如用set保存一个回调函数列表，调用时就能保证按照添加顺序调用

1 keys(),values(),entries()
keys()方法、values方法、entries方法返回的都是遍历器对象。
由于set结构没有键名，只有键值所有keys和values方法的行为完全一致
```bash
    let set = new Set(['red','green','blue']);

    for(let item of set.keys()){
        console.log(item);
    }
    //red 
    //green
    //blue

    for(let item of set.values()){
        console.log(item);
    }
    //red
    //green
    //blue

    for(let item of set.entries()){
        console.log(item);
    }
    // ['red','red']
    // ['green','green']
    // ['blue','blue']

    set结构的实例默认可遍历，她的默认遍历生成函数就是她的values方法
    Set.prototype[Symbol.iterator] === Set.prototype.values
    //true

    # 这意味着可直接省略values方法，直接调用for...of换选遍历set

    let set = new Set(['red','green','blue'])

    for(let x of set){
        console.log(x);
    }

    //red
    //green
    //blue
```

### forEach()
 Set结构的实例与数组一样，也拥有forEach方法，用于对每个成员执行某种操作，也没有返回值。

 set = new Set([1,2,3])
 set.forEach((value,key)=>console.log(key+":"+value))
 // 1:1
 // 4:4
 // 9:9

 上面的代码说明，forEach方法的参数就是一个处理函数。改函数的参数与数组的forEach一致，一次为键值，键名，集合本身
 forEach方法可以有第二个参数，表示处理函数内部的this对象

 ### 遍历的应用
```bash
    let set = new Set(['red','green','blue'])
    let arr = [...set]
    // ['red','green','blue']

    拓展运算符和Set结构结合，就可以取出数组的重复成员

    let arr = [3,4,5,6,3,4,5]
    let unique = [...new Set(arr)]
    // [3,4,5,6]
```

