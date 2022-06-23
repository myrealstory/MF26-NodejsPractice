const res = require('express/lib/response');
const http = require('http');
const fs = require('fs');

const server = http.createServer((req,res)=>{

    fs.writeFile(__dirname+'/../data/header.txt;',
    JSON.stringify(req.headers),err=>{
        if(err){
            res.writeHead(200,
                {'Content-Type':'text/html;charset=utf8;'});
            console.log(err);
            res.end("發生錯誤啦垃圾");
        }else {
            res.end("完成寫檔啦幹！");
        }
    })


//    res.writeHead(200,{'Content-Type':'text/html;charset=utf8'});
//    res.write(`<head><meta charset="utf-8"/></head>`);
//    res.end(`<h2>Hello World</h2>
//    <h3>這裡顯示你url的連結名稱：</h3>
//    <p>${req.url}</p>`); 
});

server.listen(3000);