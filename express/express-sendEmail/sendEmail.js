const nodemailer = require('nodemailer'); //引入模块
let transporter = nodemailer.createTransport({
	service: 'qq', //类型qq邮箱
	port: 465,
	secure: true, // true for 465, false for other ports
	auth: {
		user: '854453495@qq.com', // 发送方的邮箱
		pass: 'dzlqqninckmkbbid' // smtp 的授权码
	}
});


function sendMail(mail, code, call) {
	// 发送的配置项
	let mailOptions = {
		from: '"Express-demo" <854453495@qq.com>', // 发送方
		to: mail, // 接收方
		subject: '欢迎来到"Express-demo"', // 标题
		text: 'Hello world?', // 文本内容
		html: '<p>这里是"Express-demo"详情请点击:</p><a href="https://www.jianshu.com/u/5cdc0352bf01">sendEmail</a>', //页面内容
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
