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





