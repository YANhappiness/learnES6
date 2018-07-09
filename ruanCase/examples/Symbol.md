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