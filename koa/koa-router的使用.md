> Koa中的路由和Express不同，Express是把路由集成在Express中，Koa则需要通过kao-router模块使用。 

#### 1.安装

````bash
npm install koa-router --save-dev
````

#### 2.使用

````js
const Koa = require('koa');
// 直接调用的方式
const router = require('koa-router')();
// 或 单独创建router的实例
const Router = require('koa-router');
const router = new Router();

router.get('/', async ctx => {
    ctx.body = 'Hello Router';
})

// 启动路由
app.use(router.routes()).use(router.allowedMethods())
// 以上为官方推荐方式，allowedMethods用在routes之后，作用是根据ctx.status设置response header.

app.listen(3000, err => {
    if (err) throw err;
    console.log('runing...');
});
````

