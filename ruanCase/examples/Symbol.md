# Symbol 
 Es6引入了新的一种原始数据类型Symbol，表示独一无二的值。他是javascript的第七种类型
undefined,null,Boolean,string,Number,Object,Symbol

Symbol值是通过symbol函数生成，这就是说，对象的属性名现在可以有两种类型，一种是原来就有的字符串，另一种就是新增的Symbol类型，凡是属性名是Symbol类型的就都是独一无二的，可以保证不与其他类型冲突。

let s = Symbol();
type s  //symbol

symbol可以接受一个字符串作为参数，表示Symbol实例描述，主要是为了在控台显示，或者转化为字符串时比较好区分。

```bash
    let s1 = Symbol('foo');
    let s2 = Symbol('bar');
    s1 // symbol('foo');
    s2 // symbol('bar');

    s1.toString();   //Symbol(foo)
    s2.toString();   //Symbol(bar)
```

上面代码中，s1,s2是两个Symbol值。如果不加参数，他们在控制台的输出都是Symbol，不利于区分。有了参数输出时可以分得清是哪个值。

如果symbol的参数是一个对象，就会调用toString方法将其转化为字符串才会生成一个Symbol值。

```bash
    const obj = {
        toString(){
            return 'abc'
        }
    }

    const sym = Symbol(obj);
    sym //symbol('abc')
```

symbol函数的参数只是表示对当前symbol值的描述，因此相当参数的symbol函数的返回值是不相等的。

```bash
    let s1 = Symbol();
    let s2 = Symbol();

    s1 === s2  // false

    let s1 = Symbol('foo');
    let s2 = Symbol('foo');

    s1 === s2; // false
```

s1 、s2 都是Symbol函数的返回值，而且参数相同，但是他们是不相等的。

symbol值是不能与其他值一起运算的。

```bash
    let sym = Symbol('my symbol');
    'hello '+ sym //err

    `hello ${sym}`  //err
```

但是symbol值可以隐性的转化为布尔值，但是不能转化为数值。

```bash
    let sym = Symbol('my sym');
    String(sym);    //  'Symbol(my sym)'
    sym.toString();    //  'Symbol(my sym)'
```

另外 Symbol值也可以转化为Boolean，但是不能转化为数值

```bash
    let Sym = Symbol();

    Boolean(Sym); //true
    !sym // false

    if(sym){
        ...
    }

    Number(Sym) // TypeError

    Sym + 2 // TypeError

```

## 作为属性名的Symbol

由于每个Symbol值都是不相等的，这意味着Symbol值作为标识符，用于对象的属性名，就能保证不会出现同名属性，这对于一个对象由多个模块构成的情况非常有用，能防止某一个键被不小心改写或覆盖。

```bash
    let mySym = Symbol();
    # 第一种写法
    let a = {};
    a[mySym] = 'Hello';

    # 2
    let a = {
        [mySym] : 'Hello';
    }

    # 3
    let a = {};
    Object.defineProperty(a,mySym,{value : 'Hello'});

    a[mySym]   //'Hello'
```

Symbol值作为对象属性名时，不能用点运算符

```bash
    const mySym = Symbol();
    const a = {};

    a.mySym = 'Hello';  
    a[mySym] // undefined  mySym为字符串
    a['mySym'] // 'Hello' 
```

因为点运算符后面总是字符串，所以不会读取mySym作为标识符所指代的那个值，导致a的属性名实际是一个字符串，而不是一个Symbol值。

在对象内部，使用Symbol值定义属性时，Symbol值必须放在方括号内，

```bash
    let s = Symbol();
    let Obj = {
        [s] : function(arg){
            console.log(arg);
        }
    }
    Obj[s](123);  //123
```

Symbol类型还可以定义一组常量，保证这组常量的值都是不相等的。

```bash
    const log = {};
    log.levels = {
        Debug : Symbol('debug'),
        Info : Symbol('info'),
        Wran : Symbol('wran')
    }

    console.log(log.levels.Debug);

    # other

    const COLOR_RED = Symbol();
    const COLOR_GREEN = Symbol();

    function getComplement(color){
        switch(color){
            case COLOR_RED :
                return COLOR_RED;
            case COLOR_GREEN :
                return COLOR_GREEN
            default :
            throw new Error('Undefined color');
        }
    }
```

任何值都不会有相同的值，因此可以保证上面的switch语句会按照设计的方式工作

## 实例：消除魔术字符串
魔术字符串指的是，再带中多次出现、与代码形成强耦合的某一个具体的字符串或者数值。风格良好的代码，应该尽量消除魔术字符串，改由含义清晰的变量替换。

```bash
    function getArea(shape,option){
        let area = 0;
        switch(shape){
            case 'Triangle':
            area:0.5*options.width*options.heigth;
            break;
        }
        return area;
    }

    getArea('Triangle',{width:100,height:100})

    # 多次出现与代码形成“强耦合”，不利于代码的后期维护

    const shapeType = {
        triangle : 'Triangle'
    }

    ....
        case shapeType.triangle:
    ....
    
    getArea(shapeType.triangle,{....})

    # 将字符串改成一个对象的属性，消除了耦合
    # 为避免冲突

    const shapeType = {
        triangle : Symbol();
    }
```

## 属性名的遍历

Symbol作为属性名，该属性不会出现在for...in、for...of循环，也不会被Object.keys()、Object.getOwnpropertyNames()、JSON.stringify()返回。但是，它也不是私有属性，有一个Object.getOwnPropertySymbols()方法，可以获取指定对象的所有Symbol属性名。

Object.getOwnpropertySymbols方法返回一个数组，成员是当前对象的所有用作属性名的Symbol值

```bash
    const obj = {}
    let a = Symbol('a');
    let b = Symbol('b');

    obj[a] = 'hello';
    obj[b] = 'world';
    const objectSymbols = Object.getOwnPropertySymbols(obj);
    objectSymbols //[symbol(a),symbol(b)]
```
    for...in/Object.getOwnPropertyNames

```bash
    const obj = {};
    let foo = Symbol("foo")

    Object.defineProperty(obj,foo,{
        value:"foobar",
    });

    for(let i in obj){
        console.log(i);
    }
    Object.getOwnPropertyNames(obj)
    // []
    Object.getOwnPropertySymbols(obj)
    // [Symbol(foo)]
```

Reflect.ownKeys方法可以返回所有类型的键名，包括常规键名和Symbol键名。
```bash
    let obj = {
        [Symbol('my_key')]:1,
        enum:2,
        nonEnum:3
    }

    Reflect.ownKeys(obj)
    // ["enum", "nonEnum", Symbol(my_key)]  //只返回键名
```

由于以Symbol值作为名称的属性，不会被常规方法遍历得到。我们可以利用这个特性，为对象定义一些菲斯有的，但又希望只用于内部的方法

```bash
    let size = Symbol('size');
    class Collection{
        constructor(){
            this[size] = 0;
        }

        add(item){
            this[this[size]] = item;
            this[size]++
        }

        static sizeOf(instance){
            return instance[size];
        }
    }

    let x = new Collection();
    Collection.sizeOf(x); //0

    x.add('foo')    
    Collection.sizeOf(x) //1

    Object.keys(x) // [0]
    Object.getOwnPropertyNames(x) // ['0']
    Object.getOenPropertySymbols(x) //Symbol(size)
```
只有Object.getOwnPropertySymbols()可以获取x的size属性，造成了一种私有的内部方法的效果




