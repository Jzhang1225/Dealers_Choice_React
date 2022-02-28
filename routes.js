const router = require('express').Router()
const {Animal} = require('./db/database')

router.get('/', async(req,res,next)=>{
    try{
        res.send(await Animal.findAll())
    }
    catch(e){
        next(e)
    }
})

router.get('/:id', async(req,res,next)=>{
    try{
        res.send(await Animal.findByPk(req.params.id))
    }
    catch(e){
        next(e)
    }
})

router.delete('/:id', async(req, res, next)=>{
    try{
        const animal = await Animal.findByPk(req.params.id)
        await animal.destroy()
        res.send(await Animal.findAll())
    }
    catch(e){
        next(e)
    }
})

module.exports = router