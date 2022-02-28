const {Animal, initAndSeed, database} = require('./db/database')
const express = require('express')
const app = express()

app.get('/api/animals', async(req,res,next)=>{
    try{
        res.send(await Animal.findAll())
    }
    catch(e){
        next(e)
    }
})


const setUp = async()=>{
    await initAndSeed();
    const port = 3000
    app.listen(port, ()=>console.log(`SERVER STARTED at port ${port}`))
}

setUp()
