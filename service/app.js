
var express = require('express');
var app = express();
var fs = require('fs');

//用于解析数据
var bodyParser = require('body-parser');
//上传文件中间件
var multer = require('multer');
var formidable = require('formidable');

app.use(express.static('static'));
app.use(bodyParser.urlencoded({ extended: false }));
 
 
app.all('*', function(req, res, next) {
    // CORS配置
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
  });

 app.use('/upload', require('./routes/upload'));

 app.listen(8082, function (req, res) {
  
})
