
require("dotenv").config();
const express = require("express");
const multer = require('multer');
//const upload = multer({dest: 'tmp-uploads'});
const upload = require(__dirname+ '/modules/upload-images');
const session = require('express-session');
const moment = require('moment-timezone');
const { tz } = require("moment-timezone");

const db = require(__dirname + '/modules/mysql_connect.js'); //資料庫連線的模組
const MysqlStore = require("express-mysql-session")(session);//把session存進這裡。
const sessionStore = new MysqlStore({},db);//這裡三個步驟逝固定的。建立sessionStore
//在這裡做同一管理，為了其他的頁面也可以做到相同的連線。

const { toDateString,
    toDatetimeString,
    } = require(__dirname + '/modules/date-tools.js');


const app = express();

app.set("view engine", "ejs");
app.set("case sensitive routing", true);

// Top-level middlewares

app.use(session({
    saveUninitialized: false,
    resave: false,
    secret:'dkfdl12fewv923fdmks202r12', // 加密cookie用的
    store: sessionStore, //因建立了資料庫。所以cookie會把加密用代號存到sql裡面，設立叫store
    cookie:{
        maxAge: 1200000,//毫秒 這樣兩分鐘
     }, //這裡可以設定cookie存活的時間。

}));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use((req,res,next)=>{
    // res.json({action : 'Stop'});//這一個跟404 同一個意思，如果在中路下這個就不會執行了。
    res.locals.shinder = '哈嘍';
    res.locals.toDateString = toDateString;
    res.locals.toDatetimeString = toDatetimeString;

    next(); //如果下這個就會經過這個程式，但因為有next的關係會繼續執行。
});


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
        res.render('post-form');
    })
    .post((req, res)=>{
        const {email, password} = req.body;
        res.render('post-form', {email, password});
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

app.get(/^\/hi\/?/i,(req,res)=>{//regular expression 的部分
    res.json({url: req.url});
});

app.get((req,res)=>{
    res.json({url: req.url});
});




app.get('/try-params1/:action?/:id?',(req,res)=>{//如果在標籤上放問號的意思是可有可無。即時今天不下也沒關係。
    res.json(req.params);
});//這個是隨便或者沒有名字和id的時候，最寬鬆的都會指向它。 記得這個要放在最後面。



app.get('/try-session',(req,res)=>{
    req.session.my_var=  req.session.my_var || 0;
    req.session.my_var++;
    res.json({
        my_var : req.session.my_var,
        session: req.session,
    });

})

app.use('/address_book',require(__dirname + '/routes/address_book'))


app.get("/try-json",(req,res)=>{
    const data = require(__dirname+ '/public/data/data01')//取得json格式的檔案。
    console.log(data);
    res.locals.rows = data; //到template的時候會產生了rows這個變數 (bootstrap使用)
    res.render("try-json"); //render 的地點是來自EJS，因為上面有設定用view去做。
})

app.get('/try-moment',(req,res)=>{
    const format = 'YYYY-MM-DD HH:mm:ss';//timezone格式
    const m1 = moment(); //設定 npm i moment-timezone 
    const m2 = moment('2022-02-29');//這是不成立的

    res.json({
        m1:m1.format(format),
        m1a:tz('Europe/London').format(format),
        m2:m2.format(format),
        m2a:m1.tz('Taiwan').format(format),
        
    });
})


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
const adminsRouter = require(__dirname + '/routes/admins');
app.use('/admins',adminsRouter);
app.use(express.static("public"));
app.use("/bootstrap", express.static("node_modules/bootstrap/dist"));
app.use("/joi", express.static("node_modules/joi/dist"));//這裡做設計路徑

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

//req.query , req.body , req.params , req,files/file , req.session


