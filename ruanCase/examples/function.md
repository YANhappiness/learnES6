# 函数的拓展

## 函数的默认值
    es5变通设置默认值方法

```bash
    function log(x,y){
        y = y || "world";
        console.log(x,y);
    }
    log("hello");  //hello world
    log("hello","China");  //hello China
    log("hello",""); //hello world
```
- 上面代码检查函数log函数的参数y有没有赋值，如果没有，则指定默认值为world。
- 缺点在于如果y赋值了，但是但是对应的布尔值为false，则该赋值不起作用。 "" 
- 为了避免这个问题，通常需要判断一下参数y是否被赋值，如果没有等于默认值
```bash
    function log(x,y){
        if(typeof y === 'undefined'){
            y = "World";
        }
        console.log(x,y);
    }
    log("hello","");  // hello 
```

es6允许函数参数默认值，直接写在参数定义的后面。
```bash
    function log(x,y="world"){
        console.log(x,y);
    }
    log("hello");  //hello world
    log("hello","China");  //hello China
    log("hello",""); //hello 
```
    参数变量是默认声明的，所以不能用let或const再次声明

```bash
    function foo(x=5,y){
        let x = 1;  //err
        const y = 2; //err
    }
```

参数默认值不是传值的，而是每次都重新计算默认值表达式的值。也就是说参数默认值是惰性求值的。
每次调用都会重新计算
```bash
    let x = 99;
    function foo(p=x+1){
        console.log(p);
    }
    foo()  // 100
    x = 100;
    foo() //101
```

## 参数默认值可以与结构赋值的默认值结合起来使用
```bash
    function foo({x,y = 5}){   //解构赋值默认值
        console.log(x,y);
    }
    foo({}) // undefined 5  
    foo({x:1}) //1 5
    foo() //TypeError
```
上面代码只使用了对象的结构赋值默认值，并没有使用函数参数的默认值。只有当函数foo的参数是一个对象时。
变量x和y才会通过解构赋值生成。如果函数foo调用时没有提供参数，变量x和y就不会生成，从而报错。通过提供函数参数默认值就可以避免这种情况
```bash
    function foo({x,y=5} = {}){  //解构赋值默认值 函数参数默认值
        console,log(x,y);
    }
    foo(); //结构赋值默认值
```
另一个例子
```bash
    function fetch(url,{body='',method='GET',header={}}){
        console.log(method);
    }

    fetch('http://abc.com',{}); //"GET"
    fetch('http://abc.com'); //报错

    上面fetch() 第二个参数是一个对象，就可以为它的三个属性设置默认值。这种写法不能省略第二个参数，结合函数参数的默认值，就可以省略第二个参数。双重默认值
    第二个参数是默认值，参数中的header也是默认值
    function fetch(url,{foo="",method:"GET",header={}}={}){
        console.log(method);
    }
    fetch('http://abc.com') // "GET"
```

    练习

```bash
    function m1({x=0,y=0} = {}){
        return [x,y];
    }

    function m2({x,y} = {x:0,y:0}){
        return [x,y];
    }

    //函数没有默认值的情况
    m1();  //[0,0]
    m2();  //[0,0]

    //函数都有默认值的情况
    m1({x:1,y:2});  //[1,2]
    m2({x:1,y:2});  //[1,2]

    //x有值，y没有值的情况下
    m1({x:1});  //[1,0]
    m2({x:1});  //[1,undefined]

    //x,y 都没有值的情况下
    m1({});//[0,0]
    m2({});//[undefined,undefined]

    
```
    上面两种写法都对函数的参数设定了默认值，区别就是
- 写法一函数参数默认值是空对象，但是设置了对象解构函数的默认值，
- 写法二函数参数默认值是一个有具体属性的对象，但没有设置对象解构赋值的默认值。
- 函数调用时的参数替换的是函数参数默认值对象 
- 个人喜好第一种写法设置对象解构默认值 赋值空对象

## 参数默认值位置
    函数设置参数默认值时应该舍友默认值的属性放到参数最后
```bash
    function Fn(x=1,y){
        return [x,y];
    }

    Fn() //[1,undefined]
    Fn(2) //[2,undefined]
    Fn(,2) //Err
    Fn(undefined,1) // [1,1]
    Fn(null,1) //[null,1]   null 无法触发默认值
```
## 函数的length属性
指定了默认值以后，函数的length属性，将返回没有指定默认值的参数的个数。指定了默认值之后会，length属性讲失真。
```bash
    (function(a){}).length //1
    (function(a=1){}).length //0
    (function(a,b=2){}).length //1

    如果设置了默认值参数不是尾参数，那么length属性也不再计入后面的参数
    (function(a=0,b,c){}).length //0
    (function(a,b=1,c){}).length //1
```

## 作用域
一旦设置了参数默认值，函数进行生命初始化时，参数会形成一个单独的作用域（context）。等到初始化结束，这个作用域就会消失。这种语法行为在不设置参数默认值时，不会出现。
```bash
    var x = 0;
    function f(y=x){
        console.log(y);
    }
    f();  //0 未设置参数默认值，作用域（context）不存在。

    var x = 0;
    function Fn(x,y=x){
        console.log(y);
    }
    Fn(2); // 2 存在参数，形成独立的（context）作用域

    let x = 1;
    function f(y=x){
        let x=2;
        console.log(y);
    }
    f(); // 1 参数y = x形成一个独立的作用域，作用域中变量x本身没有定义，所以指向外层的全局变量x。调用时，函数体内部的局部变量x影响不到默认变量x

    //----------
    var x = 1;
    function Fn(x=x){
        //···
    }
    Fn() //err x=x 形成一个单独的作用域，实际执行的时let x=x,由于暂时性死去的原因，这行代码会报错x未定义
```

如果默认值是一个函数，该函数也遵循这个规则

```bash
    let foo = "outer";
    function bar(func = ()=> foo){
        let foo = "inner";
        console.log(func());
    }
    bar();  //outer
    //上面的代码中，函数bar的参数func的默认值是一个匿名函数，返回值为变量foo。函数参数形成的单独作用域里面，并没有定义变量foo，因此输出outer
```

```bash
    var x = 1;
    function foo(x,y=function(){x=2;console.log(x)}){
        var x=3;
        console.log(x);
    }
    foo();  //3
    x //1
   //上面的代码中，函数foo的参数形成了一个单独作用域。这个作用域里面，首先声明了变量x，y。y的默认值是一个匿名函数，这个匿名函数的内部的变量x，指向同一个作用域的第一个参数x。函数foo内部又声明了一个变量x，该变量与第一个参数x由于不是同一个作用域，所以不是同一个变量。因此y执行后。内部变量x，和外部变量x都没有发生改变。

   // 如果将var x = 3的var去掉，函数foo的内部变量x就指向了第一个参数x，与匿名函数内部的x是一致的，所以最后输出的就是2.

   var x =1;
   function foo(x,y=function(){x=2;console.log(x)}){
       x = 3; //不重新声明，指向第一个参数x
       console.log(x);   //3
       y();   //2
       console.log(x);  //2
   }
   foo(); //2
   x //1
```

## 应用参数的默认值，可以指定某一个参数不得省略，如果省略就抛出一个错误。
```bash
    function throwIfMissing(){
        throw new Error("missing parameter");
    }

    function foo(mustBeProvided = throwIfMissing()){
        return mustBeProvided;
    }

    foo();
```
    如果调用时没有参数就会调用默认值throwIfMissing(),从而抛出一个错误。
    函数的默认值不是在定义时执行，而是在运行时（调用时）执行。如果参数已经赋值，默认值中的函数就不会运行。

    可以将参数默认值设置成undefined，表明这个参数是可以省略的。
```bash
    function foo(param = undefined){···}
```

## rest参数
    es6引入了rest函数（形式为...变量名），用于获取函数的多余函数。rest函数搭配的变量是一个数组，该变量将多余的参数放到数组中。
```bash
    function add(...values){
        let sum = 0;
        for(var val of values){
            sum+=val;
        }
        return sum;
    }
    add(2,3,5);
```
    将rest参数代替arguments变量的例子。
```bash
    # arguments 写法
    function sortNumber(){
        return Array.prototype.slice.call(arguments).sort();
    };

    # rest 参数写法
    const sortNumbers = (...number) => number.sort();
```

```bash
    function push(array,...items){
        items.forEach(function(item){
            array.push(item);
            console.log(item);
        })
    }

    var a = [];
    push(a,1,2,3);
```

- rect参数后不能有其他参数，否则会报错。
function f(a,...b,c){}
- 函数的length属性，不包括rect参数
(function(a){}).length //1
(function(...a){}).length //1
(function(a,...b){}).length //1

## 严格模式
    es5函数内部可设置严格模式，es6规定，只要函数参数使用了默认值，解构赋值，或者拓展运算符，那么函数内部就不能显式设定为严格模式，否则会报错。

## name属性
函数的name属性就是返回该函数的函数名
```bash
function foo(){} 
foo.name // "foo"

var foo = function(){}
foo.name // "" es5
foo.name // "foo" es6
```
如果把一个具名函数赋值给一个变量。则es5和es6的name属性都会返回这个具名函数原本的名字
```bash
    const bar = function baz(){}
    # es5 / es6 返回结果相同
    bar.name //"baz"
```
Function 构造函数返回函数实例，name属性的值为anonymous。
(new Function).name // "anouymous"

## 箭头函数
    es6允许使用箭头函数（=>）定义函数
```bash
    var f = v=>v;
    var f = function(v){
        return v;
    }
```
    如果箭头函数不需要参数或需要多个参数，就是用一个圆括号代表参数部分。
```bash
    var f = () =>5;
    # 等同于
    var f = function(){ return 5;}

    var sum = (sum1,sum2) => sum1+sum2;
    # 等同于
    var sum = function(sum1,sum2){return sum1+sum2}
```

由于大括号被解释成代码块，所以如果箭头函数直接返回一个对象，必须在对象外面加上括号。
```bash
    let getItem = id =>{id:id,name:"temp"}; //Err
    let getItem = id =>({id:id,name:"temp"}); 
```

箭头函数可以与变量解构结合使用
```bash
    const full = ({first,last}) => first+" "+last;
    function full(person){
        return person.first +" " +person.last;
    }
```
简化回调函数
```bash
    [1,2,3].map(x => x*x);

    var result = values.sort((a,b) => a-b);
```
rest参数与箭头函数结合的例子
```bash
    const numbers = (...nums) => nums;
    numbers(1,2,3,4,5);

    const numbers = (foo,...bar) => [foo,bar];
    numbers(1,2,3,4,5)
```

## 使用注意点
this对象指向是可变的，但是在箭头函数中，他是固定的。
```bash
    function foo(){
        setTimeout(()=>{
            console.log("inner--id:",this.id);
        },100)
        console.log("out--id:",this.id);
    }

    var id = 21;

    foo.call({id:42});
    # 箭头函数导致this总是指向函数定义生效时所在的对象 42
```
箭头函数可以让setTimeout里面的this，绑定定义时所在的作用域，而不是指向运行时所在的作用域
```bash
    function Timer(){
        this.s1 = 0;
        this.s2 = 0;
        //箭头函数
        setInterval(() => this.s1++,1000); //this绑定定义时所在的作用域
        //普通函数
        setInterval(function(){
            this.s2++; //this 指向运行时所在的作用域 ,即全局对象
            console.log(this.s2);
        },1000)
    }
    var timer = new Timer();
    setTimeout(()=>console.log('s1:',timer.s1),3100); //s1:3
    setTimeout(()=>console.log('s2:',timer.s2),3100); //s2:0
```

箭头函数可以让this指向固定化，这种特性有利于封装回调函数。
```bash
    var handler = {
        id:'123456',
        init:function(){
            document.addEventListener('click',event=>this.doSomething(event.type),false);
        },
        doSomething:function(type){
            console.log('Handler'+type+'for'+this.id);
        }
    }
```
上面代码的init方法中，使用了箭头函数，这导致这个箭头函数里面的this，总是指向handler对象。否则this.doSomething这一行会报错，因为此时this指向document对象

### this指向固定化，实际原因是箭头函数根本没有自己的this，导致内部this就是外层代码块的this。

正是因为它没有this，所以也就不能用作构造函数
```bash
    # es6
    function foo(){
        setTimeout(()=>{
            console.log("id",this.id);
        },1000);
    }
    # es5
    function foo(){
        var _this = this;
        setTimeout(function(){
            console.log("id",_this.id)
        },100)
    }
    foo.call({id:2})
```
    箭头函数本身没有自己的this，而是引用外层的this
```bash
function foo(){
    return () => {
        return => {
            return => {
                console.log("id",this.id);
            }
        }
    }
}

var f = foo.call({id:1});

var t1 = f.call({id:2})()();  //id:1
var t2 = f().call({id:3})();  //id:1
var t3 = f()().call({id:4});  //id:1
```
上面的代码中，只有一个this，就是函数foo的this，所以t1,t2,t3都输出同样的结果。因为所有的内层函数都是箭头函数，都没有自己的this，他们的this其实都是最外层的foo函数的this

出了this，以下三个变量在箭头函数中也是不存在的，指向最外层的对应变量：arguments，super、new.target

```bash
    function foo(){
        setTimeout(()=>{
            console.log("args:",arguments);
        },100);
    }

    foo(2,4,6,8);

    //args : [2,4,6,8]  //最外层foo函数的arguments
```


