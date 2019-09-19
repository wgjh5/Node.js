const Koa = require('koa');
const app = new Koa();
const bodyParser = require('koa-bodyparser');
app.use(bodyParser());
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
router.post('/home', async ctx => {
	console.log(ctx.request.body,ctx.query)
	ctx.body = 'Hello Router';
})
// 启动路由
app.use(router.routes()).use(router.allowedMethods())
// 以上为官方推荐方式，allowedMethods用在routes之后，作用是根据ctx.status设置response header.
app.listen(port, () => {
	console.log('Listening at ' + 'http://localhost:'.green + port.green + '\n'.green + 'or at ' + 'http://'.green +
		ipv4.green + ':'.green + port.green)
});
