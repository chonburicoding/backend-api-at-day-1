const { seq, QueryTypes } = require('../../config/db')
const fs = require('fs')
const moment = require('moment')

const save_err = (message)=>{
    try{
        fs.appendFileSync('./logs/err.txt', moment().format('YYYY-MM-DD HH:mm:ss') + '\t' + message + '\n')
    }catch(err){
        console.log(err.toString())
    }
}

const _get_member = async ()=>{
  
    try{
        const employees = await seq.query('SELECT * FROM tb_employee', {
            type: QueryTypes.SELECT
        })
        //console.log(employees)
        //[x, y]
        // x = result
        // y = effect row
        return {success: true, data: employees}
    }catch(err){
        return {success: false, data: err.toString()}
    }
}

const _add_member = async (req)=>{
    // replacements
    // sql injection

    // transaction
    // commit
    // err -> rollback

    // tb_order_head
    // tb_order_detail
    const t = await seq.transaction();
    try{
        const {name, salary, email, department_id, gender} = req.body
        const data = await seq.query(`
            INSERT INTO tb_employee (nam, salary, email, department_id, gender)
            OUTPUT INSERTED.id, INSERTED.name, INSERTED.salary, 
            INSERTED.email, INSERTED.department_id, INSERTED.gender
            VALUES (:namex, :salaryx, :emailx, :department_idx, :genderx)
        `, {
            replacements: {
                namex: name,
                salaryx: salary, 
                emailx: email, 
                department_idx: department_id,
                genderx: gender
            },
            type: QueryTypes.SELECT,
            transaction: t
        })
        t.commit()
        return {success: true, data}
    }catch(err){
        console.log(err.toString())
        save_err(err.toString())
        t.rollback();
        return {success: false, data: err.toString()}
    }
   
}

module.exports = {
    _get_member, 
    _add_member
}