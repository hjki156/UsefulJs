# UsefulJs
## 介绍
一些预定义的函数集，使用原生JavaScript制作，现在只有一些基础功能，以后会不断更新。
大部分函数为了保证兼容性，使用es5语法。

（大佬勿喷）

## 功能
1. 隐藏与显示元素
2. 使用新的注释标识符
3. 自定义弹窗
4. 渐入式效果
5. 渐入式状态栏

## 使用

#### 0. 引用（原生引入）
下载发行版本
```html
<script src="Usefulvxxx.js"></script>
```
#### 1. 隐藏与显示元素
```js
Darryl.objHid("元素id");
```
-->[demo](//hjki.github.io/UsefulJs/demo/objHid.html)
#### 2. 使用新的注释标识符
函数不会自动执行，
需要将代码写入页面的.js文件中或者`<style>`标签下。

```js
Darryl.annotation();
```
然后在html页面中输入`*.*`（多行注释)或者`…`（单行注释）
脚本会自动将其处理为html注释语句。

#### 3. 自定义弹窗
函数不会自动执行，
需要将代码写入页面的.js文件中或者`<style>`标签下。

```js
Darryl.modalAlert("./modal.css");
/*其中的url是可选的，建站请下载modalAlert.css，然后输入文件url*/
```
使用后，`alert`方法将被改为`alert("文本", "标题");`
其中标题是可选的。

#### 4. 渐入式效果
```js
Darryl.fadeIn("元素id", 1000)
//后面的数字是延迟时间
```
如果在元素被加载出来前使用可能会产生一个无法找到元素的错误

#### 5. 渐入式状态栏
```js
Darryl.fadeBar("元素id", "#FFFFFF", "#000000")
```
第一个16进制颜色值代表状态栏背景色，第二个则为文字颜色。
这两个值是可选的。

…（以后再写吧，我好懒![滑稽](http://qzonestyle.gtimg.cn/qzone/em/e248.gif)）
## 为什么要做这个？
为了我可爱的姐姐能更好的开发html页面，因此方法大多简单粗暴。
