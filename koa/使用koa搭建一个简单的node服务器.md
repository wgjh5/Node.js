#### 1.新建`site`文件夹，`cmd`进入命令行

````bash
npm init //初始化一份package.json
````

#### 2.下载`koa`

````bash
npm install koa --save-dev
````

#### 3.创建一个应用程序 新建app.js

```js
const Koa = require('koa');

const app = new Koa();

app.use(async ctx => {
    // ctx.body 即服务端响应的数据
    ctx.body = 'Hello Koa';
})

// 监听端口、启动程序
app.listen(3000, err => {
    if (err) throw err;
    console.log('runing...');
})
```

#### 4.启动

````bash
node app.js
````

> 此时访问localhost:3000会看到页面显示Hello Koa 