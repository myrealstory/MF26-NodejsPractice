
require("dotenv").config();
const express = require("express");
const multer = require('multer');
//const upload = multer({dest: 'tmp-uploads'});
const upload = require(__dirname+ '/modules/upload-images');


const app = express();

app.set("view engine", "ejs");

// Top-level middlewares
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.get('/try-qs', (req, res)=>{
    res.json(req.query);
});

// middleware: 中介軟體 (function)
// const bodyParser = express.urlencoded({extended: false});
app.post('/try-post', (req, res)=>{
    res.json(req.body);
});

app.route('/try-post-form')
    .get((req, res)=>{
        res.render('try-post-form');
    })
    .post((req, res)=>{
        const {email, password} = req.body;
        res.render('try-post-form', {email, password});
    });

app.post('/try-upload', upload.single('avatar'), (req, res)=>{
    res.json(req.file);
});

app.post('/try-uploads', upload.array('photos'), (req, res)=>{
    res.json({'name':1 ,params:req.files});
});

app.get('/try-params1/:action/:id',(req,res)=>{//如果在標籤上放問號的意思是可有可無。即時今天不下也沒關係。
    res.json({'name':2 ,params:req.files}); //這個是最特殊的。只要有名字和id才可以指向它。
});

app.get('/try-params1/:action',(req,res)=>{//如果在標籤上放問號的意思是可有可無。即時今天不下也沒關係。
    res.json({'name':3 ,params:req.files});//這是當只有名字的時候才可以指向它
});


app.get('/try-params1/:action?/:id?',(req,res)=>{//如果在標籤上放問號的意思是可有可無。即時今天不下也沒關係。
    res.json(req.params);
});//這個是隨便或者沒有名字和id的時候，最寬鬆的都會指向它。 記得這個要放在最後面。






/*
app.get('/try-post-form', (req, res)=>{
});
app.post('/try-post-form', (req, res)=>{
});
*/

app.get("/", (req, res) => {
    res.render("main", { name: "Shinder" });
});

// ------- static folder -----------
app.use(express.static("public"));
app.use("/bootstrap", express.static("node_modules/bootstrap/dist"));

// ------- 404 -----------
app.use((req, res) => {
    res.send(`<h2>找不到頁面 404</h2>
    <img src="/imgs/404-01-scaled.jpg" alt="" width="300px" />
    `);
});

app.listen(process.env.PORT, () => {
    console.log(`server started: ${process.env.PORT}`);
    console.log({ NODE_ENV: process.env.NODE_ENV });
});