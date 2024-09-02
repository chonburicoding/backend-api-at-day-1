const { Sequelize, QueryTypes } = require('sequelize');
const moment = require('moment')
const fs = require('fs')

const seq = new Sequelize('SHOP', 'sa', '1234', {
    host: 'localhost',
    dialect: 'mssql',
    logging: false,
    hooks: {
        afterQuery: function(x, y){
            try{
                fs.appendFileSync('./logs/sql.txt', moment().format('YYYY-MM-DD HH:mm:ss') + '\t' + y.sql + '\n')
            }catch(err){
                console.log(err.toString())
            }
        }
    }
});

module.exports = { seq, QueryTypes }