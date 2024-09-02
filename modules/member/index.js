const express = require('express')
const Router = express.Router();
const {get_member, add_member} = require('./member.controller')

Router.get('/', async (req, res)=>{
    const data = await get_member()
    res.json(data)
})

Router.post('/add', async (req, res)=>{
    const data = await add_member(req)
    res.json(data)
})

module.exports = Router