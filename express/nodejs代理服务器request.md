## request

#### 1.先下载

````bash
npm install requsest --save-dev
````

#### 2.使用

````js
const request = require('request');
request("你要请求的接口", function(error, response, body) {
});
````

[具体api](https://www.npmjs.com/package/request)