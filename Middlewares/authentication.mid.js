var jwt = require('jsonwebtoken');

const authenticate=(req,res,next)=>{

    const token = req.headers.authorization
    if(token){
        const decoded =jwt.verify(token,'newuser')
        if(decoded){
            const userID=decoded.userID
            req.body.userID=userID
            console.log(decoded)
            next()
        }else{
            res.send("Please login first !")
        }
    }else{
        res.send("please login first !")
    }

}

module.exports={
    authenticate
}