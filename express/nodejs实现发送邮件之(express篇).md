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
const express = require('express')
const app = express()
const email = require('./sendEmail.js'); //引入封装好的函数
const bodyParser = require('body-parser')
const cors = require('cors'); // 解决跨域问题
const styles = {
	'bold': ['\x1B[1m', '\x1B[22m'],
	'italic': ['\x1B[3m', '\x1B[23m'],
	'underline': ['\x1B[4m', '\x1B[24m'],
	'inverse': ['\x1B[7m', '\x1B[27m'],
	'strikethrough': ['\x1B[9m', '\x1B[29m'],
	'white': ['\x1B[37m', '\x1B[39m'],
	'grey': ['\x1B[90m', '\x1B[39m'],
	'black': ['\x1B[30m', '\x1B[39m'],
	'blue': ['\x1B[34m', '\x1B[39m'],
	'cyan': ['\x1B[36m', '\x1B[39m'],
	'green': ['\x1B[32m', '\x1B[39m'],
	'magenta': ['\x1B[35m', '\x1B[39m'],
	'red': ['\x1B[31m', '\x1B[39m'],
	'yellow': ['\x1B[33m', '\x1B[39m'],
	'whiteBG': ['\x1B[47m', '\x1B[49m'],
	'greyBG': ['\x1B[49;5;8m', '\x1B[49m'],
	'blackBG': ['\x1B[40m', '\x1B[49m'],
	'blueBG': ['\x1B[44m', '\x1B[49m'],
	'cyanBG': ['\x1B[46m', '\x1B[49m'],
	'greenBG': ['\x1B[42m', '\x1B[49m'],
	'magentaBG': ['\x1B[45m', '\x1B[49m'],
	'redBG': ['\x1B[41m', '\x1B[49m'],
	'yellowBG': ['\x1B[43m', '\x1B[49m']
};


app.use(bodyParser.urlencoded({
	extended: false
}))
app.use(bodyParser.json())
app.use(cors());
app.use(express.static(__dirname + '/'));//静态目录
const check = {} //声明一个对象缓存邮箱和验证码，留着
app.post('/email', function(req, res, next) {
	console.log(req.body)
	const mail = req.body.email
	const data = {
		rst: true,
		data: "",
		msg: ""
	}
	if (!mail) {
		return res.send('参数错误')
	} //email出错时或者为空时
	const code = parseInt(Math.random(0, 1) * 10000) //生成随机验证码
	check[mail] = code
	//发送邮件
	email.sendMail(mail, code, (state) => {
		if (state) {
			return res.send("发送成功")
		} else {
			return res.send("失败")
		}

	})


});

/* GET home page. */

app.listen(3001, () => {
	console.log('\x1B[33m%s\x1b[0m', "服务开启成功"); //yellow

})

````

[源码地址](./express-sendEmail)

[参考链接1](https://mp.weixin.qq.com/s?__biz=MzU0OTE3MjE1Mw==&mid=2247483763&idx=1&sn=0166a93351c092aeb2c4efb8c0e0a4b3&chksm=fbb2a7a5ccc52eb3b241f32601a23be8a431e671ff493327ff61becc4f4ceb1da319ec6c8ea8#rd)

[参考链接2](https://www.cnblogs.com/SRH151219/p/10968600.html)

[官网](https://nodemailer.com/transports/)