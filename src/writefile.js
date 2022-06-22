const fs = require('fs');

// fs.writeFile("try.txt","Today is a goodDay, Friend.", e=>{
//     if(e) throw e;

//     console.log("the file were been written.");
// })

fs.readFile("./try.txt","utf8", (e,data) =>{
    if(e) throw e;
    console.log(data);
})