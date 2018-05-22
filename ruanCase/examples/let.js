
/* jshint esversion: 6 */

// let 用于声明变量，但所声明的变量只有在let所在的代码块中有效
var a = [];
for (var i = 0; i < 6; i++) {
    a[i] = function () {
        console.log(i);
    };
}

a[4](); //6 i是var声明的，在全局范围内有效，所以全局只有一个变量i每一次循环，变量i的值都会改变。function里面的i全部指向全局i

{
    var a = [];
    for (let i = 0; i < 6; i++) {
        a[i] = function () {
            console.log(i);
        }
    }

    a[4](); //4 i是let声明的，当前的i只在本轮循环有效，所以每一次循环的i都是新的变量
}

//暂时性死区
{
    var tem = 123;
    if (true) {
        tem = 'abc';
        let tem; //块级作用域内存在let命令，他所声明的变量就被绑定在了这个区域，不再受外界影响，在声明前赋值会报错。
    }
}

{
    if (1) {
        //TED 开始
        tmp = 'abc'; //ReferenceError
        conosle.log(tmp); //ReferenceError

        let tmp; //TED 结束
        console.log(tmp); //undefined

        tmp = 123;
        console.log(tmp); //123;

    }
}


//块级作用域
{
    var tmp = new Date();

    function F() {
        console.log(tmp);
        if (false) {
            var tmp = 'hello';
        }
    }

    F(); //undefined  
    //if代码块外部使用外层的tmp变量，内部使用内层tmp。由于变量提升，内部tmp变量覆盖了外层tmp变量。
}

//es6 的块级作用域

function F1(params) {
    let n = 1;
    if (1) {
        let n = 10;
        console.log("inner:", n); //10
    }
    console.log("out:", n); //1
}

F1();

//es5 规定函数只能在顶层作用域和函数作用于中声明，不能在块级作用域中声明
//es6 允许在块级作用域中声明函数，函数声明语句的行为类似于let，在块级作用域之外不可被引用

function f(){console.log("outside");}
(function(){
    if(false){
        //重复声明一次函数f
        function f(){
            console.log("inside");
        }
    }
    f();  //f  is not a function 
})();

//应避免在块级作用域内声明函数，应写为函数表达式代替函数声明。
{
    let a = 'secret';
    function f(){
        return a;
    }
}

//函数表达式
{
    let a = 'secret';
    let f = function(){
        console.log(a);
    };
}