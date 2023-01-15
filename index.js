const express = require('express')
const { connection } = require('./Config/db')
const { notesRouter } = require('./Controller/notes.route')
const { userRouter } = require('./Controller/user.route')
const { authenticate } = require('./Middlewares/authentication.mid')
require('dotenv').config()

const app = express()
app.use(express.json())
app.use('/users',userRouter)
app.use(authenticate)
app.use('/notes',notesRouter)

app.listen(process.env.port,async(req,res)=>{
    try{
        await connection
        console.log("Connected to DB")
    }catch(err){
        res.send(err)
    }
    console.log(`Running on port ${process.env.port}`)
})