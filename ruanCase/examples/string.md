# 字符串的拓展

## 字符的unicode表示
    "\u0061"  a

## 字符串的遍历接口
    ```bash
        for(let codePoint of "foo"){
            console.log(codePoint);  // f,o,o
        }
    ```

## includes、startsWith、endsWith
    传统JavaScript只提供了indexOf()方法返回匹配字符串的index
    1. includes 返回布尔值，是否找到参数默认值 
    2. startsWith() 返回布尔值，表示参数字符串是否在原字符串的开头 indexOf("*") == 0
    3. endsWith() 返回布尔值，表示参数字符串是否在原字符串的结尾 index("*") == (str.length-1)
    支持第二个参数，表示开始检索的位置

## repeat 返回一个新字符串，表示将原字符串重复n次
    "x".repeat(3)  // "xxx"
    "hello".repeat(2)  // "hellohello"
    "na".repeat(0)  // ""

    "na".repeat(2.9)  // "nana" 小数向下取整

    "na".repeat(Infinity) // RangeError  无穷大
    "na".repeat(-1)  // RangeError 负数   
    "na".repeat(-0.9)  // "" 
    "na".repeat(NaN)  // ""

    "na".repeat("na")  // ""
    "na".repeat("3")   // nanana

## padStart()  padEnd()   支持两个参数 第一个 字符串长度， 第二个 需要补全的字符串
    "x".padStart(5,"ab");  // "ababx"
    "x".padStart(2,"ab");  // "ax"

    "xxx".padStart(10,"0123456789");  //如果用来补全的字符串与原字符串，两者的长度之和超过了指定的最小的长度，那么会截取超出位数补全字符串

    // 如果省略第二个参数，默认使用空格补全长度
    "x".padStart(4);  // "   x"
    "x".padEnd(4);  // "x   "

## matchAll()   //返回一个正则表达式在当前字符串的的所有匹配 

## 模板字符串 `` 用于定义多行字符串或者在字符串中嵌入变量

    大括号内部可以放入任意的JavaScript表达式，可以进行运算，以及引用对象属性
    ```bash
        let x=1;
        let y=2;

        `${x} + ${y} = ${x+y}`

        `${x} + ${y*2} = ${x+y*2}`
        let obj = {x:1,y:2}
        `${obj.x+obj.y}`
    ```

    字符串模板中调用函数

    ```bash
        function fn(){
            return "xx";
        }

        `${fn()}`
    ```

    

