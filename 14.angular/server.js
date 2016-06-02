var http  = require('http');
var url = require('url');
var fs = require('fs');
var mime = require('mime');

http.createServer(function (req,res) {
    var urlObj = url.parse(req.url,true);
    var pathname = urlObj.pathname;
    //默认路径返回我们的html页面
    if(pathname=='/'){
        res.setHeader('Content-Type','text/html;charset=utf8');
        fs.createReadStream('./15.car.html').pipe(res);
    }else if(pathname=='/favicon.ico'){
        res.end('404');
    }else if(pathname=='/ajax'){
        res.setHeader('Content-Type','application/json;charset=utf8');
        //console.log(urlObj.query);
        var arr = [
            {name:'扎瓦岛',count:1,price:30},
            {name:'nodejs',count:1,price:50},
            {name:'Angularjs',count:1,price:80},
        ];
        console.log(urlObj.query);
        req.on('data', function (data) {
            console.log(11,data.toString());
        });
        res.end(JSON.stringify(arr));
    }else{
        //bootstrap.css.map
        res.setHeader('Content-Type',mime.lookup(pathname)+';charset=utf8');
        fs.createReadStream('.'+pathname).pipe(res);
    }
}).listen(8888);