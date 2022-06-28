const db = require(__dirname + '/../modules/mysql_connect.js');

(async()=>{
   const [results, fields] = await db.query("SELECT * FROM room_list LIMIT 5");
// const [results, fields] = await db.query("use databse");//跳其他的database
// const [results, fields] = await db.query("show databases");
    //  如果使用promise 就不要寫callback function

    console.log(results);
    console.log(fields);
    process.exit();
})();