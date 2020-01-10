## Nodemailer简介

Nodemailer是一个简单易用的Node.js邮件发送组件

官网地址：[https://nodemailer.com](https://nodemailer.com/)

GitHub地址：https://github.com/nodemailer/nodemailer

Nodemailer的主要特点包括：

- 支持Unicode编码
- 支持Window系统环境
- 支持HTML内容和普通文本内容
- 支持附件(传送大附件)
- 支持HTML内容中嵌入图片
- 支持SSL/STARTTLS安全的邮件发送
- 支持内置的transport方法和其他插件实现的transport方法
- 支持自定义插件处理消息
- 支持XOAUTH2登录验证

### 安装使用：

#### 1.先下载

````bash
npm install nodemailer --save
````

#### 2.封装`sendEmail.js`

> 这里我对发送邮件进行了简单的封装，用的时候只需要传参数就好了

````js
const nodemailer = require('nodemailer'); //引入模块
let transporter = nodemailer.createTransport({
    //node_modules/nodemailer/lib/well-known/services.json  查看相关的配置，如果使用qq邮箱，就查看qq邮箱的相关配置
	service: 'qq', //类型qq邮箱
	port: 465,
	secure: true, // true for 465, false for other ports
	auth: {
		user: 'xxxx@qq.com', // 发送方的邮箱
		pass: 'xxxx' // smtp 的授权码
	}
});
//pass 不是邮箱账户的密码而是stmp的授权码（必须是相应邮箱的stmp授权码）
//邮箱---设置--账户--POP3/SMTP服务---开启---获取stmp授权码

function sendMail(mail, code, call) {
	// 发送的配置项
	let mailOptions = {
		from: '"Express-demo" <854453495@qq.com>', // 发送方
		to: mail, //接收者邮箱，多个邮箱用逗号间隔
		subject: '欢迎来到"Express-demo"', // 标题
		text: 'Hello world?', // 文本内容
		html: '<p>这里是"Express-demo"详情请点击:</p><a href="https://www.jianshu.com/u/5cdc0352bf01">点击跳转</a>', //页面内容
		// attachments: [{//发送文件
		// 		filename: 'index.html', //文件名字
		// 		path: './index.html' //文件路径
		// 	},
		// 	{
		// 		filename: 'sendEmail.js', //文件名字
		// 		content: 'sendEmail.js' //文件路径
		// 	}
		// ]
	};

	//发送函数
	transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			call(false)
		} else {
			call(true) //因为是异步 所有需要回调函数通知成功结果
		}
	});

}

module.exports = {
	sendMail
}

````

#### 3.使用方法

````js
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
app.listen(3002, err => {// 监听端口、启动程序
	if (err) throw err;
	console.log('runing...');
})

````

[源码地址](./koa-sendEmail)

[参考链接1](https://mp.weixin.qq.com/s?__biz=MzU0OTE3MjE1Mw==&mid=2247483763&idx=1&sn=0166a93351c092aeb2c4efb8c0e0a4b3&chksm=fbb2a7a5ccc52eb3b241f32601a23be8a431e671ff493327ff61becc4f4ceb1da319ec6c8ea8#rd)

[参考链接2](https://www.cnblogs.com/SRH151219/p/10968600.html)

[官网](https://nodemailer.com/transports/)