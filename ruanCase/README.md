
# ECMAScript 6 入门笔记

来源： <a href="http://es6.ruanyifeng.com/">ECMAScript 6 入门</a>

## es6 install
```bash
    # 最新转码规则
    $ npm install --save-dev babel-preset-latest
    # 不同阶段语法提案的转码规则（共有4个阶段），选装一个
    $ npm install --save-dev babel-preset-stage-2
    # 配置 .babelrc
    {
        "presets":["latest","stage-2"],
        "plugins":[]
    }
```
## 命令行转码babel-cli工具
```bash
    $ npm install -g babel-cli

    #转码结果输出到标准输出
    $ babel example.js

    # 将转码结果输入到一个文件
    # --out-file 或 -o 参数指定输出文件
    $ babel example.js --out-file complied.js
    # 或
    $ babel example.js -o complied.js

    # 将整个目录转码
    # --out-dir 或 -d 参数指定输出目录
    $ babel src --out-dir lib
    # 或者
    $ babel src -d lib
```
上面的代码全是在全局环境下，进行babel转码的。这意味着，如果项目要运行，全局必须要有babel。也就是说项目产生了对环境的依赖。另一方便这样做也无法支持不同项目使用不同版本的Babel

一个解决办法就是将babel-cli安装到项目中去
```bash
    # 安装
    $ npm install --save-dev babel-cli 
    #改写package.json
    {
        "script":{
            "bulid":"babel src -d lib"
        }
    }
```




## Build Setup
``` bash
# install dependencies
npm install

# build for production 
npm run build
```
