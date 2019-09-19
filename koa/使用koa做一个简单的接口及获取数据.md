#### 1.先安装`koa-router`

````bash
npm install koa-router --save-dev
````

#### 2.使用

```js
const Router = require('koa-router');
const router = new Router();
// 启动路由
app.use(router.routes()).use(router.allowedMethods())
```

#### 3.定义路由

```js
router.post('/home', async ctx => {
	ctx.body = 'Hello Router';
})

router.get('/list', async ctx => {
	ctx.body = 'Hello Router';
})
```

#### 4.获取请求数据

1. GET 传值

> Koa 中 GET传值通过request接收，有两种方式： query 和 querystring
>
> query：返回的是参数对象。 {name: 'jack', age: 12}
> querystring：返回的是请求字符串。 name=jack&age=12
>
> query和querystring可以从request中获取，也可以直接从ctx中获取。

```js
let request = ctx.request;
let query = request.query;
let querystring = request.querystring;

// 直接ctx获取
ctx.query
ctx.querystring
```

 2.POST 传值

>  通过post传递的值我们可以通过原生Node封装，也可以通过第三方模块接收。

- 自定义封装

```js
const querystring = require('querystring');

module.exports = ctx => {
    return new Promise((resolve, reject) => {
        try {
            let data = '';

            // ctx.req实际上就是原生node中的req
            ctx.req.on('data', (chunk) => {
                data += chunk;
            })

            ctx.req.on('end', () => {
                data = querystring.parse(data);
                resolve(data);
            })
        } 
        catch(err) {
            reject(err);
        }
    })
}
```

- 使用koa-bodyparser模块

```js
const bodyParser = require('koa-bodyparser');
app.use(bodyParser());

// 获取
ctx.request.body
```

 [完整示例](./app.js)

 参考链接：<https://www.jianshu.com/p/e6aec8bcdcf4> 

 

 

 

 

 

 

 