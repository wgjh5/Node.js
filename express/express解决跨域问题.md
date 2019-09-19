## express解决跨域问题

> 对于express解决跨域，我这里有两种方式，个人推荐第一种

#### 1.安装`cors`

````js
npm install cors --save-dev

const cors = require('cors');
app.use(cors());
````

#### 2.手动实现

````js
app.use((req, res, next) => {
res.header('Access-Control-Allow-Origin', '*')
res.header('Access-Control-Allow-Headers', 'Authorization,X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method' )
res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PATCH, PUT, DELETE')
res.header('Allow', 'GET, POST, PATCH, OPTIONS, PUT, DELETE')
next();
});
````

