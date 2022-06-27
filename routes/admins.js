const express = require ('express');

const router = express.Router();//建立router 物件
//router本身是一個middleway

router.get('/r1/:action?/:id?', (req,res)=>{
    res.json( {
        url: req.url,
        baseUR: req. baseUrl,
        orginalUrl : req.originalUrl,
        params: req.params,
        code: 'admin.js',
    });
} );

router.get('/r2/:action?/:id?', (req,res)=>{
    res.json( {
        url: req.url,
        params: req.params,
        code: 'admin.js',
    });
} );

module.exports = router;
