## express获取数据的方法

### 一.get请求(获取url上面的参数)

````js
req.query
````

### 二.post请求(获取请求体里面的参数)

#### 1.先安装`body-parser `

````bash
npm install body-parser --save-dev
````

#### 2.使用

````js
const bodyParser = require('body-parser')	

app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())

//这样就可以直接使用req.body获取参数了
````

