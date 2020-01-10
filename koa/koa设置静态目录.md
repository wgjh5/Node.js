#### 1.先下载

````bash
npm install koa-static --save
````

#### 2.引入

````js
const staticFiles = require('koa-static');
const Koa = require('koa');
const app = new Koa();

app.use(staticFiles(__dirname + '/')); //静态目录
````

