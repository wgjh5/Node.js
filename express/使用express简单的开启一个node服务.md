## 使用express简单的开启一个node服务

#### 1.先新建一个文件夹

#### 2.进入此文件夹

> `npm init`初始化一份package.json

#### 3.下载express

````bash
npm install express --save-dev
````

#### 4.新建`server.js`

````js
const express = require('express')
const app = express()

app.listen(3000, () => {
    console.log("服务开启成功"); //yellow
})
````

#### 5.开启服务

````bash
cmd进去命令行
	node server
````

