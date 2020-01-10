const Koa = require('koa');
const app = new Koa();
const Router = require('koa-router');
const router = new Router();
const staticFiles = require('koa-static');
const bodyParser = require('koa-bodyparser');
const cors = require('koa2-cors'); // 解决跨域问题
const email = require('./sendEmail.js'); //引入封装好的函数
const check = {} //声明一个对象缓存邮箱和验证码，留着
app.use(bodyParser());
app.use(cors());
app.use(staticFiles(__dirname + '/')); //静态目录
app.use(async (ctx, next) => { //对于任何请求，app将调用该异步函数处理请求：
	await next(); //调用next() 前面要加await 
});
router.post('/email', async (ctx, next) => {
	const mail = ctx.request.body.email
	const code = parseInt(Math.random(0, 1) * 10000) //生成随机验证码
	check[mail] = code
	if (!mail) {
		return ctx.body = '参数错误' //email出错时或者为空时
	}
	async function timeout() {
		return new Promise((resolve, reject) => {
			email.sendMail(mail, code, (state) => {
				resolve(state);
			})
		})
	}
	await timeout().then(state => {
		if (state) {
			return ctx.body = "发送成功"
		} else {
			return ctx.body = "失败"
		}
	})
})

app.use(router.routes()).use(router.allowedMethods()) // 启动路由
// 监听端口、启动程序
app.listen(3002, err => {
	if (err) throw err;
	console.log('runing...');
})
