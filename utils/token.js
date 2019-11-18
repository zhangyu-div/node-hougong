const jwt=require("jsonwebtoken");
const secret="miyao"
//只是一种方法
const sendToken=(userInfo)=>{
    return jwt.sign(userInfo,secret,{expiresIn:"24h"})
}
const tokenVerfiy=(req,res,next)=>{
    let token=req.cookies.token;
    jwt.verify(token,secret,(err,data)=>{
        if(data){
            next();
        }else{
            res.json({
                code:200,
                errMsg:"",
                data:{
                    list:[],
                    info:"token验证失败，请重新登录",
                    status:0
                }
            })
        }
    })
}
module.exports={
    sendToken,
    tokenVerfiy
}