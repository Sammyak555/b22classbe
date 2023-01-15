const express = require('express')
var jwt = require('jsonwebtoken');
const { UserModel } = require('../Model/user.model');
const userRouter=express.Router()
const bcrypt = require('bcrypt');

userRouter.use(express.json())
userRouter.post('/register',async(req,res)=>{
    const {name,email,role,location,password}=req.body
    try{
        bcrypt.hash(password, 5, async(err, hash)=>{
           if(err){
            console.log(err)
           }else{
            const user=new UserModel({name,email,role,location,password:hash})
        await user.save()
        res.send("user Registered !")
           }
        });
        
    }catch(err){
        res.send(err)
    }
})

userRouter.post('/login',async(req,res)=>{
    const {email,password}=req.body
    try{
        const user=await UserModel.find({email:email})
        if(user.length>0){
            bcrypt.compare(password, user[0].password, (err, result)=> {
                if(result){
                    var token = jwt.sign({ userID:user[0]._id}, 'newuser');
                    res.send({"msg":"Logged in !","token":token})
                }else{
                    res.send("Wrong Credentials !")
                }
            });
        }else{
            res.send("Authentication Failed !")
        }
    }catch(err){
        res.send(err)
    }
})



module.exports = {
    userRouter
}