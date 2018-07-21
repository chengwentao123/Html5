var express = require('express');
var routes = require('./routes');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var app = express();

// 引入处理post数据的模块
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
// app.use(bodyParser.text({
//   type: 'application/x-www-form-urlencoded'
// }), function (req, res, next) {
//     console.log('bodyParser.raw');
//     next();
// });
app.use(routes);

//设置跨域访问
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

app.on('uncaughtException', function(err){
    console.error(err.stack);
    process.exit();
});

app.listen(3000);
console.log('listening on http://localhost:3000');
