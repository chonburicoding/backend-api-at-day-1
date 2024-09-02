const { timeStamp } = require('console')
const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')
const moment = require('moment')
const productRouter = require('./modules/product/index')
const memberRouter = require('./modules/member')
const axios = require('axios')


// body-parser
//const bodyParser = require('body-parser')
//app.use(bodyParser())
app.use(express.json()) // middleware ที่ต้อง request ต้องผ่าน
app.use('/product', productRouter)
app.use('/member', memberRouter)

// express.json() 
// 1. รับข้อมูลจาก frontend = {}
// 2. แปลงข้อมูลให้อยู่ในรูป object
// 3. assign ค่า ให้ req.body 

app.get('/', async (req, res)=>{
    //const {data} = await axios.get('https://jsonplaceholder.typicode.com/users')
    //console.log(data)
    //const {name, address} = data[0]
    const person = [
        {
            name: "Vize Tommy",
            position: "Senior",
            phone: "123456789",
            weekdays: ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']
        }
    ]
    
    res.json(person[0])
})

app.get('/test/:idx/:idy', (req, res)=>{
    //parameter = req.params
    //query string = req.query
    const {idx, idy} = req.params
    res.json({
        idx: idx,
        idy: idy
    })
})

app.get('/test2', (req, res)=>{
    res.json(req.query)
})

app.post('/api/login', (req, res)=>{
    // post method = req.body
    const {user_name} = req.body

    //jwt.sign(x, y, z)
    // x = ค่าที่จะเข้ารหัส = {}
    // y = SECRET_KEY = string
    // z = กำหนดอายุ token = {}
    const token = jwt.sign({user_name}, 'XXX', {
        expiresIn: '5m' //1000*60
    })

    res.json({
        token
    })
})

const xx = (req, res, next)=>{ // ถ้ามี token ถึงจะผ่านไป process อื่นได้
   
    try{
        const headers = req.headers.authorization || null
        if(headers){
            const txt = headers.split(' ')
            const token = txt[1]
            const data = jwt.verify(token, 'XXX')
            //const iat = moment.unix(data.iat).format('YYYY-MM-DD HH:mm:ss')
            //const exp = moment.unix(data.exp).format('YYYY-MM-DD HH:mm:ss')

            next()
       }else{
            throw 'not found token'
        }
        
    }catch(err){
        res.json({data: err.toString()})
    }
  
}

// frontend -->data --> backend --> middleware --> processing

app.get('/api/product', xx, (req, res)=>{
    res.json({success: true})
})

app.get('/api/member', xx, (req, res)=>{
    res.json({success: true})
})

app.post('/api/verify', (req, res)=>{
    const headers = req.headers.authorization || null
    if(headers){
        try{
            const txt = headers.split(' ')
            //jwt.verify(x, y)
            // x = token
            // y = SECRET_KEY
            const token = txt[1]
            const data = jwt.verify(token, 'XXX')
            const iat = moment.unix(data.iat).format('YYYY-MM-DD HH:mm:ss')
            const exp = moment.unix(data.exp).format('YYYY-MM-DD HH:mm:ss')
            /*data  = {
                user_name: 'admin',
                iat: 11111,
                emp: 22222
            }*/
  
            res.json({
                ...data,
                iat,
                exp
            })
        }catch(err){
            res.json({data: err.toString()})
        }
    }

})

//timeStamp = เวลาตั้งแต่ 1970-01-01 00:00 เป็น วินาที 1725079586


app.listen(3000, ()=>{
    console.log('Server is running on port 3000')
})