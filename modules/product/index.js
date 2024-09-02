const express = require('express')
const Router = express.Router();

Router.get('/', (req, res)=>{
    res.send('product')
})

Router.get('/xx', (req, res)=>{
    res.send('product/xx')
})
Router.get('/yy', (req, res)=>{
    res.send('product/yy')
})

module.exports = Router