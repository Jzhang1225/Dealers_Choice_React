const {initAndSeed} = require('./db/database')
const express = require('express')
const app = express()
const router = require('./routes')
const path = require('path')

app.use('/api/animals', router)

app.get('/', (req,res,next)=>res.sendFile(path.join(__dirname,'index.html')))

const setUp = async()=>{
    await initAndSeed();
    const port = 3000
    app.listen(port, ()=>console.log(`SERVER STARTED at port ${port}`))
}

setUp()
