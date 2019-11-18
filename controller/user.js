const userModel = require("../model/user");
const crypto = require('crypto');//引入加密模块
const tokenUtils=require("../utils/token")
const userRegister = async (req, res) => {
    let { username, password } = req.body;
    let findData = await userModel.userFind({ username })
    if (findData) {
        res.json({
            code: 200,
            errMsg: "",
            data: {
                info: "皇帝名已存在",
                status: 2
            }
        })
    } else {
        const hash = crypto.createHash('sha256');//创建加密算法
        hash.update(password);//加密数据
        // console.log(hash.digest("hex"));//得到数据

        let status=true;//登录状态
        let registerTime=new Date().getTime();
        // 用户昵称
        let name=Math.random().toString(36).substr(2,8);
        let userPic="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2720998957,689701151&fm=15&gp=0.jpg"
        let saveData = await userModel.userSave({ username, password:hash.digest("hex"),status,registerTime,name,userPic});
        if (saveData) {
            res.json({
                code: 200,
                errMsg: "",
                data: {
                    info: "注册成功,即将为您跳转到登录页面",
                    status: 1
                }
            })
        }
    }
}



// userModel.userFind({username},(result)=>{
//     if(result){
//         res.json({
//             code:200,
//             errMsg:"",
//             data:{
//                 info:"用户名已存在",
//                 status:2
//             }
//         })
//     }else{
//         userModel.userSave({username,password},()=>{
//             res.json({
//                 code:200,
//                 errMsg:"",
//                 data:{
//                     info:"注册成功",
//                     status:1
//                 }
//             })
//         })
//     }
// })
const userLogin=async (req,res)=>{
    let {username,password}=req.body;

    let findData=await userModel.userFind({username});
    if(findData){
        if(findData.status){ 
            const hash = crypto.createHash('sha256');//创建加密算法
            hash.update(password);//加密数据
            // console.log(hash.digest("hex"));//得到数据
            if(findData.password == hash.digest("hex")){
                let token=tokenUtils.sendToken({username});
                res.cookie("token",token);//两个参数 key value  发送一个cookie给客户端

                res.json({
                    code:200,
                    errMsg:'',
                    data:{
                        info:"登录成功，吾皇万岁万岁万万岁",
                        status:1
                    }
                })           
            }else{
                res.json({
                    code:200,
                    errMsg:'',
                    data:{
                        info:"密码错误",
                        status:2
                    }
                })
            }
        }else{
            res.json({
                code:200,
                errMsg:'',
                data:{
                    info:"账号异常",
                    status:3
                }
            })
        }
    }else{
        res.json({
            code:200,
            errMsg:"",
            data:{
                info:"皇帝名称不存在，或已驾崩",
                status:0
            }
        })
    }
}

const usersList = async (req, res) => { 
    let { page, limit } = req.query;
    let data = await userModel.usersPage(page, limit);
    if (data.length > 0) {
        res.json({
            code: 200,
            errMsg: "",
            data: {
                list: data,
                status: 1
            }
        })
    } else {
        res.json({
            code: 200,
            errMsg: "",
            data: {
                list: [],
                status: 0
            }
        })
    }
}
module.exports = {
    userRegister,
    userLogin,
    usersList
}