const cpUpload = require("../utils/upload");

const ImageUpload = (req,res) => {
    cpUpload(req,res,(err)=>{
        if(err){
            res.json({
                code:200,
                errMsg:"",
                data:{
                    urlImage:"https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1256590387,3526992347&fm=26&gp=0.jpg",
                    info:"服务器错误"
                }
            })
        }else{
            let urlPath = "http://localhost:3000/img/"+req.files.booksLogo[0].filename;
            res.json({
                code:200,
                errMsg:"",
                data:{
                    urlImage:urlPath
                }
            })
        }
    })
}


module.exports = {
    ImageUpload
}