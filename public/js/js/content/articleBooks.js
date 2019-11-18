class ArticleBooks{
 
    constructor(){
        this.container = $(".content");
        this.init();
    }
    init(){
        this.createPage();
    }
    createPage(){
        this.container.html(ArticleBooks.template);
        this.rich();
        this.booksFormSubmit();
    }
    rich(){
        var KE;
        KindEditor.ready(function (K) {
            KE= K.create('#Contents', {
                allowFileManager: true, //浏览图片空间
                filterMode: false, //HTML特殊代码过滤
                afterBlur: function () { this.sync(); }, //编辑器失去焦点(blur)时执行的回调函数（将编辑器的HTML数据同步到textarea）
                afterUpload: function (url, data, name) { //上传文件后执行的回调函数，必须为3个参数
                    if (name == "image" || name == "multiimage") { //单个和批量上传图片时
                        var img = new Image(); img.src = url;
                        img.onload = function () { //图片必须加载完成才能获取尺寸
                            if (img.width > 100) {
                                KE.html(KE.html().replace('<img src="' + url + '" width="100" height="100"/>', '<img src="' + url + '" width="100" height="100px"/>'))
                                //KE.html(KE.html().replace('<img src="' + url + '" width="300"/>', '<img src="' + url + '" width="300"/>'))
                            }
                        }
                    }
                }
            });
        });
        KindEditor.create('#Contents', { allowImageUpload: false, resizeType: 1 });
    }
    booksFormSubmit(){
        this.container.find("#books_form").on("submit",this.handleBooksFormSubmitCb.bind(this));
    }
    handleBooksFormSubmitCb(e){
        e.preventDefault();
        let title=this.container.find("#booksTitle").val();
        let content=this.container.find("#Contents").val();
        $.ajax({
            type:"POST",
            url:"/article/addArticle",
            data:{
                title,
                content
            },
            success:this.handlePublicArticle.bind(this)
        })
    }
    handlePublicArticle(data){
        console.log(data);
        if(data.data.status==1){
            alert("发布成功");
            new Slider().handleSliderClick(4);
        }else{
            alert(data.data.info)
        }
    }
}

ArticleBooks.template = `
<div class="articleBooks">
    <form  id="books_form">
    <div class="form-group">
    <label for="booksTitle">文章标题</label>
    <input type="text" class="form-control" id="booksTitle" placeholder="请输入章节标题">
    </div>
<textarea name="Contents" id="Contents" style="width:100%;height:450px;"></textarea>    
    <button type="submit" class="btn btn-default">提交</button>
    </form>
</div>
`