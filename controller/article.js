const articlesModle=require("../model/articles")
const addArticle=async (req,res)=>{
    let {title,content}=req.body;
    let data=await articlesModle.articleSave({title,content});
    if(data){
        res.json({
            code:200,
            errMsg:"",
            data:{
                info:"发布成功",
                status:1
            }
        })
    }else{
        res.json({
            code:200,
            errMsg:"",
            data:{
                info:"发布失败",
                status:0
            }
        })
    }
}
const articlesList= async (req, res) => { 
    let { page, limit } = req.query;
    let data = await articlesModle.articlesPage(page, limit);
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
const articleContent= async (req,res)=>{
    let {id} = req.query;
    let data = await articlesModle.articleFind(id);
    if(data){
        res.json({
            code:200,
            errMsg:"",
            data:{
                data
            }
        })
    }else{
        res.json({
            code:200,
            errMsg:"",
            data:{
                data:"",
                info:"没有找到相对应的书籍"
            }
        })
    }
}
const articleDel = async (req,res)=>{
    let {id} = req.query;
    let data = await articlesModle.articlesDel(id);
    if(data.ok == 1){
        res.json({
            code:200,
            errMsg:"",
            data:{
                info:"删除成功",
                status:1
            }
        })
    }else{
        res.json({
            code:200,
            errMsg:"",
            data:{
                info:"删除失败",
                status:0
            }
        })
    }

}
module.exports={
    addArticle,
    articlesList,
    articleContent,
    articleDel
}