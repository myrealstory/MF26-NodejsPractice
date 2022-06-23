require('dotenv').config();
const express = require('express');
const app = express();

app.set('view engine','ejs');

app.use(express.static("public"));
app.use('/bootstrap/',express.static("node_modules/bootstrap/dist"));

app.get('/',(req,res)=>{
    res.render('main',{ name: "hello World" });
    
});

app.use((req,res)=>{
    res.send(`<h2>找不到頁面 404 </h2><img style:"object-fit:cover;" src="./img/404-01-scaled.jpeg"/>`);
});
//404的undeified 要記得放在所有路由的後面。***

app.listen(process.env.PORT,()=>{
    console.log(`server started: ${process.env.PORT}`);
    console.log({NODE_EVN:process.env.NODE_EVN});
});
