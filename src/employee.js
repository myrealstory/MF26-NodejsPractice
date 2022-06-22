const Person = require('./className');


class Employee extends Person {

    constructor(name = "", age = 20, employee_id =""){
         //如果沒有特別定義constrator，就會直接繼承上一個constractor
         super(name,age);
         //一定要在最前面就呼叫父類的constractor
         this.employee_id = employee_id;
    }
    toJSON() {
        // const {name,age,employee_id}= this;
        // return{
        //     name,
        //     age,
        //     employee_id,
        // };
        return {...super.toJSON(),employee_id: this.employee_id,}

    }
}

module.exports = Employee;