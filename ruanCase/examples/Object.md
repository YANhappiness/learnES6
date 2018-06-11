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