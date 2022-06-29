const express = require('express');

const db = require(__dirname + '/../modules/mysql_connect');
const { toDateString,
    toDatetimeString, } = require(__dirname + '/../modules/date-tools.js');
const moment = require('moment-timezone');
const upload = require(__dirname + '/../modules/upload-images')


const router = express.Router();//建立router 物件
//router本身是一個middleway

const getListHandler = async (req,res)=>{

    let output = {
        perPage: 5,
        page: 1,
        totalRows: 0,
        totalPages: 0,
        code: 0,
        query: {},
        rows: []
    };

    let page = +req.query.page || 1;
    let beginDate = req.query.beginDate || '';
    let endDate = req.query.endDate || '';

    let search = req.query.search || ''; //搜尋功能
    let where = 'WHERE 1 '; //如果要下Where作為一個const/ let 要記得空格哦！
    if (search) { 
        where += `AND name LIKE ${ db.escape('%'+search+'%') }`;
        output.query.search = search;
        output.showTest = db.escape('%' + search + '%'); //測試，查看
    }
    if (beginDate) {
        const mo = moment(beginDate);
        if (mo.isValid()) {
            where += `AND birthday >= '${mo.format('YYYY-MM-DD')}' `;
            output.query.beginDate = mo.format('YYYY-MM-DD');
        }
    }

    if (endDate) {
        const mo = moment(endDate);
        if (mo.isValid()) {
            where += `AND birthday <= '${mo.format('YYYY-MM-DD')}' `;
            output.query.endDate = mo.format('YYYY-MM-DD');
        }
    }

    if (page < 1) { 
        output.code = 410;
        output.error = '頁碼太小';
        return output; //因為還沒設定好就被傳出去了。所以黨頭就不能再設定。所以每次設定都要return結束再開始。
    }

    const sql01 = `SELECT Count(1) totalRows FROM address_book ${where}`;
    const [[totalRows]] = await db.query(sql01);
    let totalPages = 0;
    if (totalRows) { 
        totalPages = Math.ceil(totalRows / output.perPage);
        if (page > totalPages) { 
 
            output.totalPages = totalPages;
            output.code = 420;
            output.code = "頁碼太大";
            return res.redirect(`?page=${totalPages}`);
        }

        const sql02 = `SELECT * FROM address_book ${where} ORDER BY sid DESC LIMIT ${(page - 1) * output.perPage}, ${output.perPage}`;
        const [r2] = await db.query(sql02);
        r2.forEach(el => el.birthday = toDateString(el.birthday));
        output.rows = r2;
    }//如果今天決定要用async，那query的時候就記得使用await
    output.code = 200;

    output = { ...output, page, totalRows, totalPages};

    // res.json(output);
    return output;
} 

router.get('/', async (req,res)=>{
    // res.json( {
    //     url: req.url,
    //     baseUR: req. baseUrl,
    //     orginalUrl : req.originalUrl,
    //     params: req.params,
    //     code: 'admin.js',
    // });

    const output = await getListHandler(req, res);
    switch (output.code) { 
        case 410:
            return res.redirect(`?page=1`);
            break;
        case 420:
            return res.redirect(`?page=${output.totalPages}`);
            break;
    }
    res.render('address-book/Main', output);
});
router.get('/api', async (req,res)=>{

    const output = await getListHandler(req,res);
    res.json('address-book/Main', output);
}); //如果是 /api的話就只呈現json格式

router.get('/add', async (req,res)=>{
    res.render('address-book/add');
    
} ); 
router.post('/add', upload.none(), async (req, res) => {
    res.json(req.body);
    
} ); 


module.exports = router;
