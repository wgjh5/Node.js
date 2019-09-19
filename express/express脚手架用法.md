#### 1.全局安装

```bash
npm install -g express-generator@4
或者
npm install express-generator -g
```

#### 2. 在一个文件夹里面用`express`命令创建应用架构

```bash
express test
cd test
```

#### 3. 进入test文件夹安装依赖，推荐cnpm安装所有依赖

```bash
npm install
```

#### 4. 启动应用

```bash
SET DEBUG=test:*	
npm start
//也可以直接用 npm start
```

#### 5. 访问在浏览器3000端口号

```bash
http://localhost:3000
```

[官方文档](http://www.expressjs.com.cn/starter/generator.html)