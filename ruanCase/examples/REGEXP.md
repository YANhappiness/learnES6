
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








