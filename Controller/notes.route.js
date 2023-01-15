const express=require('express')
const { NotesModel } = require('../Model/notes.model')
const notesRouter=express.Router()

notesRouter.use(express.json())

notesRouter.get('/get',async(req,res)=>{
    try{
        const notes = await NotesModel.find()
        res.send(notes)
    }catch(err){
        res.send(err)
    }
})
notesRouter.post('/create',async(req,res)=>{
    const payload = req.body
    try{
        const note = new NotesModel(payload)
        await note.save()
        res.send("note created !")
    }catch(err){
        res.send(err)
    }
})
notesRouter.patch("/edit/:id",async(req,res)=>{
    const ID=req.params.id
    console.log(ID)
    const payload = req.body
    const note =await NotesModel.find({"_id":ID})
    const userID_in_note =note[0].userID 
    const userID_making_req=req.body.userID
    console.log(note)
    try{
        if(userID_making_req!==userID_in_note){
            console.log(userID_making_req,userID_in_note)
            res.send("you are not autherized")
        }else{
            await NotesModel.findByIdAndUpdate({"_id":ID},payload)
        res.send("updated the note")
        }
    }catch(err){
        res.send("something went wrong while updating")
    }
})
notesRouter.delete("/delete/:id",async(req,res)=>{
    const ID=req.params.id
    const note =await NotesModel.find({"_id":ID})
    const userID_in_note =note[0].userID 
    const userID_making_req=req.body.userID
    try{
        if(userID_making_req!==userID_in_note){
            console.log(userID_making_req,userID_in_note)
            res.send("you are not autherized")
        }else{
            await NotesModel.findByIdAndDelete({"_id":ID})
        res.send("deleted the note")
        }
    }catch(err){
        res.send("something went wrong while deleting")
    }
})

module.exports={
    notesRouter
}

