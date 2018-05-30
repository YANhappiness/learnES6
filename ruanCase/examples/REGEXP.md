
# RegExp 构造函数

es5的Regexp构造函数的参数有两种。

```bash
    var regexp = new RegExp("xyz","i");  // 参数是字符串，第二个参数表示正则表达式的修饰符

    var regexp = new RegExp(/xyz/i);    // 参数是正则表达式，返回一个原有正则表达式的拷贝

    // 等同于
    var regexp = /xyz/i;

    // es5 这种写法会报错
    var regexp = new RegExp(/xyz/,"i");

    // es6 
    new RegExp = (/abc/ig,'i').flags;
    // "i"   --> 原有正则对象的修饰符是ig，他会被第二个参数覆盖 
```

## 字符串的正则方法
    字符串对象有4个方法，可以使用正则表达式：match() 、 replace() 、 search() 、split()

    - match()  null或数组：返回所有匹配文本的信息
    - replace() 用于替换字符匹配字符串，返回新数组、不改变原数组
    - search() 用于检索字符串中的子字符串，返回-1或匹配的index值
    - split() 用于把一个字符串切割成字符串数组

## u修饰符
    es6对正则表达式添加了U修饰符，含义为“unicode模式”，用于正确处理大于"/uffff"的Unicode字符会正确处理四字节的UTF-16编码。

    ```bash
        /^\uD83D/u.test('\uD83D\uDC2A') // false   es6 能正确识别utf-16， 将正则当成两个个字符
        /^\uD83D/.test('\uD83D\uDC2A') // true     es5 仅能识别utf-8，将正则当成一个字符

        test:用于检测一个字符串是否符合某一规则
    ```
    一旦加U之后会改变下面的正则行为
    1. 点字符
    ...

## RegExp.prototype.unicode属性
    正则实例对象新增unicode属性，表示是否设置了u修饰符

    const r1 = /hello/
    const r2 = /hello/u

    r1.unicode //false
    r2.unicode // true

## y修饰符
    es6中添加了y修饰符，叫做“黏连”修饰符
    y修饰符的作用与g修饰符类似，也是全局匹配。后一次匹配都是从上一次匹配成功的下一个位置开始
    不同之处：
    g修饰符只要剩余位置中存在匹配成功即可。
    y修饰符确保匹配必须从剩余的第一个位置开始。

```bash
    var s = "aaa_aa_a";
    var r1 = /a+/g;
    var r2 = /a+/y
    r1.exec(s); //["aaa"];
    r2.exec(s); //["aaa"];

    // 第一次检测后的剩余字符 _aa_a

    r1.exec(s); //["aa"];  // g修饰符没有规定位置要求 返回。。
    r2.exec(s); //null   // y修饰符 检测第一位为"_" 不符合，返回null

    exec：用于检测正则表达式中的匹配/null

    将r2修改为："/a_+/y" 则会和g一样返回
```

使用lastIndex更好的说明y修饰符

```bash
    const REGEX = /a/g;
    REGEX.lastIndex = 2; //定义检索的开始位置  

    const match = REGEX.exec("xaya");
    match.index // 3  匹配成功

    REGEX.lastIndex // 4 下一次检索开始位置 4

    REGEX.exec("xaya"); // unll
    
```

    上面的代码中，lastIndex属性每次检索的开始位置，g修饰符从这个位置向后搜索，知道发现匹配位置
    y修饰符同样遵循该法则，但是必须要求lastIndex指定位置发现匹配

```bash
    const Regex = /a/y;

    Regex.lastIndex = 2;

    Regex.exec("xaya"); // null 非黏连匹配

    Regex.lastIndex = 3;  // 检索位置从第三个index开始

    const match = Regex.exec("xaya"); 

    match.index = 3;  // 符合匹配规则

    Regex.lastIndex; // 下一次匹配开始位置
```

    实际y修饰符隐藏了头部匹配^标志

```bash
    const Regex = /a/gy;
    'aaaxa'.replace(Regex,"-");   // "---xa"

    //最后一个a不是出现在下一次匹配的头部，不会替换
```
    单个的y修饰符对match方法仅能返回第一个匹配，需要与g修饰符连用
```bash
    'a1a2a3'.match(/a\d/y);  //['a1']
    'a1a2a3'.match(/a\d/gy); // ['a1','a2','a3']
    // 相当于 
    'a1a2a3'.match(/a\d/g); // ['a1','a2','a3']    
```

    y修饰符的应用。 是从字符串中提取token（词元），y修饰符确保了匹配之间不会有漏掉的字符
```bash 
    const TOKEN_Y = /\s*(\+|[0-9]+)\s*/y;
    const TOKEN_G = /\s*(\+|[0-9]+)\s*/g;

    tokenize(TOKEN_Y,'3+4'); // ['3','+','4']
    tokenize(TOKEN_G,'3+4'); // ['3','+','4']

    function tokenize(TOKEN_REGEXP,str){
        let result = [];
        let match;
        while(match = TOKEN_REGEXP.exec(str)){
            result.push(match[1]);
        }
        return result;
    }

    //当出现非法字符 两者结果就有差异了

    tokenize(TOKEN_Y,'3x+4'); // ['3','+','4']
    tokenize(TOKEN_G,'3x+4'); // ['3','+','4']

    //g会忽略非法字符，但是y不会
```


## RegExp.prototype.sticky 属性 用于检测是否设置了y修饰符
```bash
    var Reg = /hello\d/y
    r.sticky;  //true
```

## RegExp.prototype.flags 属性 用于返回正则表达式的修饰符
```bash
    //es5 返回正则表达式的正文 source
    const Reg = /abg/gi

    Reg.source // abc

    //es6 返回正则表达式的修饰符
    Reg.flags // gi
```

## 后行断言
    javascript语言的正则表达式，仅支持先行断言和先行否定断言。不支持后行断言和后行否定断言
- 先行断言 ： x只有在y前面才匹配。必须写成/x(?=y)/
    1. 只匹配百分号前面的数字： /d+(?=%)/

- 先行否定断言： x只有不在y前面才匹配 /x(?!y)/
    1. 只匹配不在百分号前面的数字 /d+(?!%)/ 

```bash
    /\d+(?=%)/.exec('100% of US presidents have been male');  //['100']
    /\d+(?!%)/.exec('that’s all 44 of them'); // ['44']

    // 先行断言()中的部分是不计入返回结果的。
```
- 后行断言和先行断言相反。x只有在y后面才匹配，必须写成/(?<=y>)x/
    匹配美元符号后面的数字要写成 /(?<=$)\d+/
- 后行否定断言与先行否定断言相反 x只有不在y后面才匹配 写成 /(?<!y)x/

```bash
    /(?<=\$)\d+/.exec('Benjamin Franklin is on the $100 bill')  // ["100"]
    /(?<!\$)\d+/.exec('it’s is worth about €90')                // ["90"]

    // ()中部分不计入返回结果
```
    后行断言案例

```bash
    const Re = /(?<=\$)foo/g;
    '%foo $foo #foo'.replace(Re,'bar')  //"%foo $bar #foo"
```
后行断言的实现是需要先匹配/(? <=y)x/ 中的x，然后再回到左边匹配y部分。这种先右后左的执行顺序会导致不符合预期的结果

```bash
    /(?<=(\d+)(\d+))$/.exec('1053');  //后行断言
    /^(\d+)(\d+)$/.exec('1053'); // 先

    //上面代码中，需要捕捉两个组匹配。没有“后行断言”时，第一个括号是贪婪模式，第二个括号只能捕获一个字符，所以结果是105和3。而“后行断言”时，由于执行顺序是从右到左，第二个括号是贪婪模式，第一个括号只能捕获一个字符，所以结果是1和053。
```

## 具名组匹配

正则表达式使用圆括号进行匹配
```bash
    const Re = /(\d{4})-(\d{2})-(\d{2})/
    const matchObj = Re.exec('1999-12-31');
    matchObj // ["1999-12-31", "1999", "12", "31", index: 0, input: "1999-12-31", groups: undefined]
    const year = matchObj[1];
    const month = matchObj[2];
    const day = matchObj[3];
```

ES2018 引入了具名组匹配，允许为每个组匹配指定一个名称

```bash
    const RE = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/
    const matchObj  = RE.exec('1990-12-12');
    const year = match.groups.year;
    const month = match.groups.month;
    const day = match.groups.day;
```
具名组匹配相当于为每个组匹配加上一个ID，便于描述匹配的目的。不用考虑匹配的顺序问题
如果没有匹配，那么对应的groups对象的属性回事undefined


## 解构赋值和替换
有了具名组匹配以后可以使用解构赋值直接从匹配结果上为变量赋值
```
    let {groups:{one,two}} = /^(?<one>.*):(?<two>.*)$/u.exec('foo:bar')
    one:foo
    two:bar
```

字符串替换时，使用$<组名>引用具名组。
```bash
    let re = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/
    '2015-01-02'.replace(re,'$<day>/$<month>/$<year>');
```

## 引用
    正则表达式内部引用某个"具名组匹配"，可以使用\k<组名>的写法

```bash
    const Re = /^(?<word>[a-z]+)!\k<word>$/;
    Re.test('abc!abc');  //true
    Re.test('abc!cba');  //false 

    // 数字引用 \1 依然有效
    const Re = /^(?<word>[a-z]+)!\1$/;
    // 可以组合使用
    const Re = /^(?<word>[a-z]+)!\k<word>!\1$/;
    Re.test('abc!abc!abc');  //true
```

## String.prototype.matchAll()
    如果一个正则表达式在字符串里面有多个匹配，现在一般使用g或者y就可以提取出来

```bash
    const Re = /t(e)(st(\d?))/g;
    const str = 'test1test2test3';
    const matchs = [];
    var match;
    while(match = Re.exec(str)){
        matchs.push(match);
    }
```
    String.prototype.matchAll方法，可以一次性取出所有匹配。不过，它返回的是一个遍历器（Iterator），而不是数组。

```bash
    const str = 'test1test2test3';
    const Re = /t(e)(st(\d?))/g;

    for(const match of str.matchAll(Re)){
        console.log(match);
    }
```
由于string.matchAll(regex)返回的是遍历器，所以可以用for...of循环取出。相对于返回数组，返回遍历器的好处在于，如果匹配结果是一个很大的数组，那么遍历器比较节省资源。

遍历器转为数组是非常简单的，使用...运算符或者Array.from方法就可以了。

```bash
    [...str.matchAll(Re)];
    [Array.from(str.matchAll(Re))]
```






