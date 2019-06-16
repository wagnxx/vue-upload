
var express = require('express');
var router = express.Router();
var fs = require('fs');





router.post('/file', function (req, res) {
    res.json({
        data: [
            {
                name: 'root', children: [
                    { name: 'tup' },
                    { name: 'tup2' },
                    { name: 'tup.jpg' }
                ]
            }
        ]
    });
    console.log(req.files[0]);//上传的文件信息
    //文件名
    var des_file = __dirname + "/" + req.files[0].originalname;

    fs.readFile(req.files[0].path, function (err, data) {
    })
})
    .get('/', function (req, res) {
        res.json({
            data: 'get requet msg'
        });
    })


module.exports = router;