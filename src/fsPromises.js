const http = require('http');
const { Promise } = require("node-fetch");
const { emitWarning } = require("process");

const fs = require('fs').promises;

const server = http.createServer(async(req,res)=>{
    res.writeHead(200,{
        'Content-Type':'text/html;charset=utf8'
    });

    try{
        await fs.writeFile(
            __dirname + '/../data/header01.txt',
            JSON.stringify(req.headers)
        );
        res.end('完成寫檔啦廢物');
    } catch (ex){
        console.log(ex);
        res.end("死廢物，發生錯誤啦");
    }
});

server.listen(3000);