const mongoose = require('mongoose')

const notesSchema= mongoose.Schema({
    task:String,
    brief:String,
    author:String,
    userID:String
})

const NotesModel = mongoose.model("notes",notesSchema)

module.exports={
    NotesModel
}