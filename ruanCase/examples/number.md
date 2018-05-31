# 数值的拓展

## 二进制、八进制表示法
    分别使用0b，0o表示

    es5在严格模式下，八进制不允许使用前缀0表示。es6必须前缀需要使用0o表示。

## Number.isFinite() ,Number.isNaN
- Number.isFinite() 用来检测一个数值是否为有限的（finite）即不是Infinite 无穷大
    参数类型不是数值，Number.isFinite 一律返回false
- Number.isNaN() 用于检测一个是是否为NaN
    Number.isNaN(NaN) // true
    当判断参数不是NaN返回false
- 他们与传统isFinite(),isNaN区别在于，传统方法先调用Number()将非数值进行转化，再进行判断。而这个新方法只对数值有效。
```bash
    isFinite(25);  //true
    isFinite("25"); //true
    Number.isFinite(25);  //true
    Number.isFinite("25"); //false

    isNaN(NaN);   //true
    isNaN("25"); //true
    Number.isNaN(NaN) //true
    Number.isNaN("NaN") //false
    Number.isNaN(1);  //false
```

## Number.parseInt()、Number.parseFloat()
    ES6将全局方法parseInt()、parseFloat()，一直到Number对象上，行为保持不变。逐步减少全局性方法。
    parseInt === Number.parseInt //true  
    parseFloat === Number.parseFloat //true  

## Number.isInteger()
    Number.isInteger() 用于判断一个数是否为整数。
    如果参数不是数值，Number.isInteger() 返回false
    整数和浮点数采用同样的存储方式
    Number.isInteger(25) //true
    Number.isInteger(25.0) //true;

## Number.EPSILON()
    ES6在Number对象上，新增了一个极小的常量Number.EPSILON。根据规格，他表示1与大于1的最小浮点数之间的差。

## Math 对象的拓展
- Math.trunc()方法用于去除一个数的小数部分，返回整数部分。
    Math.trunc(4.9) //4
    Math.trunc(-0.9) //-0
- 对于非数值Math.trunc()内部会使用Number方法将其转为为数值
    Math.trunc("12.3") //12
    Math.trunc(true)  //1
    Math.trunc(false) //0
    Math.trunc(null) //0
- 对于空值和无法截取整数的值，返回NaN。
    Math.trunc(NaN)  //NaN
    Math.trunc("bar") //NaN
    Math.trunc() // NaN
    Math.trunc(undefined) //NaN

## Math.sign() 用于判断一个方法到底是正数，负数，还是零。对于非数值会先将其转换成数值
    五种返回值
- 参数为正数 返回+1
- 参数为负数 返回-1
- 参数为0 返回+0
- 参数为-0 返回-0
- 参数为NaN 返回NaN
```bash
    Math.sign(+2)  //+1
    Math.sign(-2)   //-1
    Math.sign(0)  //+0  
    Math.sign(-0) //-0
    Math.sign(NaN) //NaN
```
    如果参数是非数值，会自动转为数值。对于那些无法转为数值的值，会返回NaN
```bash
    Math.sign(""); //0
    Math.sign(true) //1
    Math.sign(false) //0
    Math.sign(null) //0
    Math.sign("+9") //1
    Math.sign() //NaN
    Math.sign(undefined) //NaN
```

对于没有部署这个方法的环境，可以用下面的代码模拟
```bash
    Math.sign = Math.sin || function(x){
        x = +x; //转化为number数值
        if(x===0 || isNaN(x)){
            return x;
        }
        return x > 0 ? 1 : -1;
    }
```