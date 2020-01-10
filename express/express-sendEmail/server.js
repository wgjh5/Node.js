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
