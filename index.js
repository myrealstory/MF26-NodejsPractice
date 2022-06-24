require('dotenv').config();
const express = require('express');
const app = express();

app.set('view engine','ejs');

app.use(express.static("public"));
app.use('/bootstrap/',express.static("node_modules/bootstrap/dist"));

//Top-level middlewares
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.get('/try-qs',(req,res)=>{
    res.json(req.query);
})

//middleware : 中介軟體 （function）
// const bodyparse = express.urlencoded({extended:false}); //false true 都可以，用queystring做解析，false的話
// app.post('/try-post',bodyparse,(req,res)=>{ })
app.post('/try-post',(req,res)=>{ //設定bodyparse ，然後用bodyparse儲存，再用res傳json到req的body裡。
    res.json(req.body);
});

app.route('/post-form')
.get((req,res)=>{
    res.render('post-form');
})
.post((req,res)=>{
    const {email,passowrd} = req.body;
    res.render('post-form',{post: {email,password}});
})


//--------------static content----------
app.get('/',(req,res)=>{
    
    res.render('main',{ name: "hello World" });
    
});
//----------------404------------------

app.use((req,res)=>{
    res.send(`<h2>找不到頁面 404 </h2><img style:"object-fit:cover;" src="./img/404-01-scaled.jpeg"/>`);
});
//404的undeified 要記得放在所有路由的後面。***

app.listen(process.env.PORT,()=>{
    console.log(`server started: ${process.env.PORT}`);
    console.log({NODE_EVN:process.env.NODE_EVN});
});
