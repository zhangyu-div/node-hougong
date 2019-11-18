const mongoose = require("../utils/database");

const Article = mongoose.model("articles",{
    title:String,
    content:String
})
const articleSave=(articleInfo)=>{
    let article=new Article(articleInfo);
    return article.save();
}
const articlesPage= (page,limit)=>{
    page = Number(page);
    limit = Number(limit);
    return Article.find().skip((page-1)*limit).limit(limit);
}
const articleFind= (id)=>{
    return Article.findOne({_id:id});
}
const articlesDel = (id)=>{
    return Article.remove({_id:id});
}

module.exports={
    articleSave,
    articlesPage,
    articleFind,
    articlesDel
}
