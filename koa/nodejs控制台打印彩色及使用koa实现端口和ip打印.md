## 一、控制台彩色打印

#### 下载`console-color-mr`

````bash
npm install console-color-mr --save-dev
````

#### 第一种用法：

直接引入 `require('console-color-mr');` 

修改了默认颜色。console.info会直接输出红色

````js
//use color
console.info('------------ default color--------');
console.info('info', 'fff'); //green text
console.warn('this is warn');//yellowBG text
console.error('this is error');//red text
console.debug('this is debug');//gray text
console.log('this is log','msg1'.red, 'msg2'.blue);
console.info('this is info','msg1'.red, 'msg2'.blue); //force change default color
console.info('----------------------------');

````

在变量中或者函数中使用变色 

````js
console.group('---------variable use color------------');

let name = 'Michael';
let age  = 1000;

let obj = {
	name : 'michael',
	age  : '100'
};

function hello() {
	return 'hello';
}

function isBoole() {
	return true;
}

console.log(name);
console.log('Hello,My name is ' + name.green + ',I am a' + ' man'.yellow + '.');
console.log(age.blue);
console.log(obj.name.blue);
console.log(obj.name.greenBG);
console.log(hello().red);
//Boolean value must change to string.
console.log(isBoole().toString().red);

console.groupEnd();


````

#### 第二种用法：

第一种引入之后，会对原有的系统对象方法做修改。如果您仍然想使用系统对象上的方法的请用一个变量保存这个引用。
`let _console = require('console-color-mr');`

````js
_console.info('info');
_console.debug('debug');
_console.warn('warn');
_console.error('error');

````

##### style

````bash
‘bold’

‘italic’

‘underline’

‘inverse’

‘strikethrough’

‘white’

‘grey’

‘black’

‘blue’

‘cyan’

‘green’

‘magenta’

‘red’

‘yellow’

‘whiteBG’

‘greyBG’

‘blackBG’

‘blueBG’

‘cyanBG’

‘greenBG’

‘magentaBG’

‘redBG’

‘yellowBG’
````

参考链接：https://blog.csdn.net/michael51/article/details/79035459

## 二、koa实现端口和ip打印(类似于vue)

#### 1.先下载`os`

````bash
npm install os --save-dev
````

#### 2.引入

````js
const os = require('os');
````

#### 3.使用

````js
function getIPv4() {
	//同一接口可能有不止一个IP4v地址，所以用数组存
	let ipv4s = [];
	//获取网络接口列表对象
	let interfaces = os.networkInterfaces();
	Object.keys(interfaces).forEach(function(key) {
		interfaces[key].forEach(function(item) {
			//跳过IPv6 和 '127.0.0.1'
			if ('IPv4' !== item.family || item.internal !== false) return;
			ipv4s.push(item.address); //可用的ipv4s加入数组
			// console.log(key + '--' + item.address);
		})
	})
	return ipv4s[0]; //返回一个可用的即可
}
let ipv4 = getIPv4();//局域网IP
````

###### 示例:

````js
const Koa = require('koa');
const app = new Koa();
// 直接调用的方式
// const router = require('koa-router')();
// 或 单独创建router的实例
const Router = require('koa-router');
const router = new Router();
const os = require('os');
const port = 3000;
require('console-color-mr');
//获取本机ipv4地址
function getIPv4() {
	//同一接口可能有不止一个IP4v地址，所以用数组存
	let ipv4s = [];
	//获取网络接口列表对象
	let interfaces = os.networkInterfaces();
	Object.keys(interfaces).forEach(function(key) {
		interfaces[key].forEach(function(item) {
			//跳过IPv6 和 '127.0.0.1'
			if ('IPv4' !== item.family || item.internal !== false) return;
			ipv4s.push(item.address); //可用的ipv4s加入数组
			// console.log(key + '--' + item.address);
		})
	})
	return ipv4s[0]; //返回一个可用的即可
}
let ipv4 = getIPv4();
app.use(async (ctx, next) => {
	// ctx.body = 'Hello World';
	await next();
});
router.get('/home', async ctx => {
	ctx.body = 'Hello Router';
})
// 启动路由
app.use(router.routes()).use(router.allowedMethods())
// 以上为官方推荐方式，allowedMethods用在routes之后，作用是根据ctx.status设置response header.
app.listen(port, () => {
	console.log('Listening at ' + 'http://localhost:'.green + port.green + '\n'.green + 'or at ' + 'http://'.green +
		ipv4.green + ':'.green + port.green)
});

````

![](../img/ip_demo.png)