# 对象的拓展

## 1.属性的简洁表示法

ES6允许直接写入变量和函数，作为对象的属性和方法。这样书写更加简洁

```bash
    const foo = 'foo';
    const baz = {foo};
    baz // {foo:'foo'}

    # 等同于
    const foo = {foo:'foo'}
```

上面的代码中，ES6允许在对象中，直接写变量。这事，属性名为变量名，属性值为变量的值。下面是另一个例子。

```bash
    function f(x,y){
        return {x,y};
    }
    # ||
    function f(x,y){
        return {x:x,y:y}
    }

    f(1,2); // Obj {x:1,y:2}
```
属性可以简写，方法也可以简写
```bash
    const o = {
        method(){
            return "Hello";
        }
    }
    # ||
    const o = {
        method:function(){
            return "Hello"
        }
    }
```
example
```bash
    let birth = '2000/01/01';
    const Person = {
        name:"张三",
        birth, //birth:birth
        hello(){console.log("name:",this.name)}
    }
```
other
```bash
    function getPoint(){
        const x = 1;
        const y = 10;
        return {x,y}
    }
    getPoint(); //{x:1,y:10}
```
CommonJS模块输出一组变量，就非常和使用简洁写法
```bash
    let ms = {};
    function getItem(key){
        return key in ms ? ms[key]:null;
    }
    function setItem(key,value){
        ms[key] = value;
    }
    function clear(){
        ms = {};
    }
    module.export = {getItem,setItem,clear};
    # ||
    module.export = {
        getItem:getItem,
        setItem:setItem,
        clear:clear
    }
```
属性的赋值器(setter)和取值器（getter），事实上也是采用这种写法。
```bash
    const cart = {
        _wheels : 4,
        get wheels(){
            return this._wheels;
        },
        set wheels(value){
            if(value<this._wheels){
                throw new Error("value lower");
            }
            this._wheels = value;
        }
    }
```
简洁写法的属性名总是字符串。 "wheel"
如果某个方法是Generator函数，前面要加上*号

## 属性名表达式
Javascript 定义对象的属性，有两种方法。
```bash
    # 一
    obj.foo = true;  //直接使用标识符作为属性名 ES5
    # 二
    obj['a'+'bc'] = 123; // 使用表达式作为属性名
```
example
```bash
    let lastWord = 'last word';
    const a = {
        'first word': 'hello',
        [lastWord] : 'world'
    }

    a['first word'] // "hello"
    a[firstWord] // Uncaught ReferenceError: firstWord is not defined
    a[lastWord] // world
    a['last word'] //world
    lastWord = 'last word'
    # 驼峰写法可以解析成非驼峰字符串，反之报错
```

表达式用于定义方法名

```bash
    let obj = {
        ['h'+'ello'](){
            return 'hi';
        }
    };

    obj.hello() //hi
```

属性名表达式如果是一个对象，默认情况下会自动将对象转化为字符串[object object]

```bash
    const keyA = {a:1};
    const ketB = {b:2};
    const myObject = {
        [keyA]:"valueA",
        [keyB]:"valueB",
    }
    myObject // object{[object Object]: "valueB"}
```

## 方法的name属性

属性的name属性，返回函数名。对象方法也是函数，因此也有name属性

```bash
    const person = {
        sayName(){
            console.log('hello!');
        },
    };
    person.sayName.name //"sayName"
```

name 返回函数名即方法名
如果对象的方法使用了取值函数（getter）和存值函数（setter），则name属性不是在改方法上面，而是该方法的属性描述对象的get和set属性上面，返回值是方法名前加上get和set

```bash
    const obj = {
        get foo(){},
        set foo(x){}
    }
    obj.foo.name
    // 'name' undefined
    const descriptor = Object.getOwnPropertyDescriptor(obj,'foo')
    descriptor.set.name // 'set foo'
```

bind方法创造的对象，name属性返回bound加上原函数的名字；Function构造函数创造的函数，name属性返回anonymous

```bash
    (new Function()).name(); "anonyomous"
    var doSomething = function(){}
    doSomething.bind.name //"bound doSomething"
```

如果对象的方法是一个symbol值，那么name属性返回的是这个symbol值的描述

```bash
    const key1 = Symbol('description');
    const key2 = Symbol();
    let obj = {
        [key1](){},
        [key2](){},
    };
    obj[key1].name //"[description]"
    obj[key1].name //"" 无描述
```

## object.is()

es5 前者自动转化数据类型，后者NaN不等于自身。
用来比较两个值是否严格相等，与严格比较运算符（===）的行为基本一致

```bash
Object.is('foo','foo');  //true
Object.is({},{});   //false

#不同之处 +0 != -0 ,NaN等于本身
+0 === -0 // true
NaN === NaN // false 

Object.is(+0,-0);  // false
Object.is(NaN,NaN); // true
```

Object.definePrototype(Object,"is",{
    value:function(x,y){
        if(x === y){
            //针对+0 不等于 -0的情况
            x !== 0 || 1/x === 1/y
        }
        return  x !== x && y !== y;
    },
    configurable:true,
    enumerable:false,
    writeable:true,
});

## Object.assign 方法
用于对象的合并，将源对象（source）的所有的可枚举属性，复制到目标对象上（target）
```bash
    const target = {a:1};
    const source1 = {b:2};
    const source2 = {c:3};
    Object.assign(target,source1,source2);
    target // {a:1,b:2,c:3}
```
Object.assign方法的第一个参数是目标对象，后面的参数都是源对象。
注意，如果目标对象与源对象是同名属性，或多个源对象有同名属性，则后面的属性会覆盖前面的属性
如果存在同名属性，则后面的属性会覆盖前面的属性。

```bash
    const target = {a:1,b:2};
    const source1 = {b:3,c:4}
    const source2 = {c:3,a:4}
    Object.assign(target,source1,source2)
    target// {a: 4, b: 3, c: 3}
```

如果只有一个参数会直接返回该参数

```bash
    const obj = {a:0}
    Object.assign(obj) === obj //true
```

如果该参数不是对象，回先转化为对象再返回。
typeof Object.assign(2) // "Object"

由于undefined和null无法转化为对象，所以如果把它们当成参数，就会报错。

```bash
    Object.assign(undefined); //报错
    Object.assign(null); //报错
```

如果非参数出现在源对象的位置（即非首参数），那么处理规则有所不同，首先这些参数会转化成对象，无法转化成对象，就会跳过，undefined和null不在首参数，就不会报错。

```bash
    let obj = {a:1}
    Object.assign(obj,undefined) == obj// true 非对象被忽略
```

其他类型的值（数值，字符串，布尔值）不在首参数，也不会报错。但是，除了字符串会以数组的形式，拷贝到目标对象，其他值都不会产生效果。

```bash
    const v1 = 'abc';
    const v2 = true; // 忽略
    const v3 = 10; // 忽略
    const obj = Object.assign({},v1,v2,v3);
    console.log(obj); //{"0":"a","1":"b","2":"c"}
```

注意点

- 浅拷贝 Object.assign方法实行的是浅拷贝，如果源对象某个属性的值是对象的引用，那么目标对象得到的就是这个对象的引用。

```bash
    const obj1  = {a:{b:1}};
    const obj2 = {Object.assgin{},obj1}
    obj1.a.b = 2   //改变引用的值
    obj2.a.b //2
```

源对象obj1的a属性是一个对象，Object.assign的值是这个对象引用，对这个值的任何变化都会体现到目标对象上。

- 同名属性的替换

对于这种嵌套的对象，一旦遇到同名属性，Object.assign的处理方法是替换，而不是添加。

```bash
    const target = {a:{b:"c",d:"e"}};
    const source {a:{b:"hello"}};
    Object.assign(target,spurce);

    # {a:{b:"hello"}}
```

target对象的a属性被source对象的a属性整个替换了.

- 数组的处理

Object.assign可以用来处理数组，但是会把数组视为对象。

Object.assign([1,2,3],[4,5]);
//[4,5,3]

上面代码中，Object.assign把数组视为属性名为0，1，2的对象，因此，源数组的0号属性4替换了对象数组中的1

- 取值函数的处理

Object.assign只能进行值的复制，如果复制的值是一个取值函数，那么将计算后复制。

```bash
    const source = {
        get foo(){return 1};
    }

    const target = {};
    Object.assign(target,source);
    # {foo:1}
```

Object.assign 不会复制取值函数，而是计算后复制该值。

## 常见的Object.assign()用途

- 为对象添加属性

```bash
    class Ponit {
        constructor(x,y){
            Object.assign(this,{x,y});
        }
    }
```

object.assign将x,y属性添加到Point类的对象实例

- 为对象添加方法

```bash
    Object.assign(SomeClass.prototype,{
        someMethod(arg1,arg2){

        },
        antherMethod(){

        }
    })

    # 相当于

    someClass.prototype.someMethod = function(arg1,arg2){

    }

    someClass.prototype.antherMethod  = function(){

    }
```
使用了对象的属性的简洁表示法，直接将两个函数放到大括号中，在使用assign方法添加到someClass.prototype上

- 克隆方法

```bash
    function clone(origin){
        return Object.assign({},origin);
    }
```

上面的代码将原始对象拷贝到一个空对象，就得到了原始对象的拷贝。

这种方法只能克隆原始对象本身，不能克隆他继承的值。如果想要保持集成链，可以采用下面的代码。

```bash
    function clone(origin){
        let originProto = Object.getPrototype(origin)
        return Object.assgin(Object.create(originProto),origin)
    }
```

- 合并对象

将多个对象合并到某个对象。

```bash
    const merge = (target,...sources) => Object.assgin(target,...sources);

    # 合并后返回一个新对象

    const merge = (...sources) => Object.assgin({},...sources);
```

- 为属性指定默认值

```bash
    function DEFAULTS = {
        logLevel = 0;
        outputFormat = 'html';
    }

    function processContent(options){
        options = Object.assgin({},DEFAULTS,options);
        console.log(options);
    }
```

DEFAULTS对象是默认值，options对象是用户提供的参数。Object.assgin()方法将DEFAULTS和options合并成一个新对象，如果两者有同样的属性，则options的属性会覆盖DEFAULTS属性的值

由于存在浅拷贝的问题，DEFAULTS对象和options对象最好都是简单类型。不要指向另一个对象，否则DEFAULTS对象的属性很可能不起作用。

```bash
    const DEFAULTS = {
        url:{
            host:'example.com',
            port:'8080'
        },
    }

    processContent({url:{port:8000}}

    {
        url:{port:8000}
    }
```

上面的代码愿意是将url.port改成8000，url.host不变。实际结果却是options.url覆盖掉了DEFAULTS.url，所以url.host就不存在了

- 属性的可枚举性和遍历

对象的每隔属性都有一个描述对象用来控制该属性的行为。Object.getOwnPropertyDescriptor方法获取该属性的描述对象。

```bash
    let obj = {foo: 123};
    Object.getOwnPropertyDescriptor(obj,'foo')

    ####{value: 123, writable: true, enumerable: true, configurable: true}
```