class ArticleList{
    constructor(){
        this.container=$(".content");
        this.init();
    }
    init(){
        this.createPage();
    }
    createPage(){
        this.container.html(ArticleList.template);
        this.getArticlesList();
    }
    getArticlesList(){
        $.ajax({
            type: "GET",
            url: "/article/articlesList",
            data: {
                page: 1,
                limit: 10 
            },
            success: this.handleGetArticlesListSucc.bind(this)
        })
    }
    handleGetArticlesListSucc(data){
        var str="";
        for(var i=0;i<data.data.list.length;i++){
            str+=
            `<div data-id="${data.data.list[i]._id}"><span class="title">${data.data.list[i].title}</span><span class="articledel">删除</span></div>`
        }
        this.container.find(".article").html(str);
        this.titleClick();
        this.delClick();
    }
    titleClick(){
        $.each(this.container.find(".article div .title"),this.handTitleClick.bind(this));
    }
    handTitleClick(index){
        this.container.find(".article div .title").eq(index).on("click",this.handTitleClickSucc.bind(this,index));
    }
    handTitleClickSucc(index){
        let id=this.container.find(".article div").eq(index).attr("data-id");
        window.location.href="http://localhost:3000/html/article.html?id="+id;
    }
    delClick(){
        $.each(this.container.find(".articledel"),this.handdelClick.bind(this));
    }
    handdelClick(index){
        this.container.find(".articledel").eq(index).on("click",this.handdelClickSucc.bind(this,index));
    }
    handdelClickSucc(index){
        let id=this.container.find(".articledel").eq(index).parent().attr("data-id");
        $.ajax({
            type:"get",
            url:"/article/articledel",
            data:{
                id:id
            },
            success:this.handdelClickSuccs.bind(this)
        })
    }
    handdelClickSuccs(data){
        if(data.data.status==1){
            alert(data.data.info);
            this.getArticlesList();
        }else{
            alert(data.data.info);
        }
    }

}
ArticleList.template=`
    <div class="article">

    </div>
`