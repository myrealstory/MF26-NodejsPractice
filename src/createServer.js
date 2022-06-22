const http = require('http');
const { parse } = require('path');
const url = require('url');

const server = http.createServer((req,res)=>{

    if(req.url == "/"){
        res.writeHead(200,{'Content-Type':'text/html'})
        res.write("<h1>You are in HomePage!</h1>");
        res.end();
    }else {
        let parseURL = url.parse(req.url );
        res.write("hello " + parseURL.pathname);
        res.end();
    }

});

server.listen(3501,()=>{
    console.log("Server is running which port 3501. ");
})