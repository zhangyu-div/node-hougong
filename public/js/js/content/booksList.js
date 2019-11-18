class Sort{
    sort(_data, _field, _asc){
        var _temp;
        for (var m = 0; m < _data.length; m++){
            for (var n = m + 1; n < _data.length; n++) {
                if (_data[m][_field] * _asc > _data[n][_field] * _asc) {
                    _temp = _data[m];
                    _data[m] = _data[n];
                    _data[n] = _temp;
                }
            }
        }
    }
}
class BooksList {
    constructor() {
        this.container = $(".content");
        this.init();
    }
    init() {
        this.createPage();
    }
    createPage() {
        this.container.html(BooksList.template);
        this.getBooksList();
    }
    getBooksList() {
        $.ajax({
            type: "get",
            url: "/books/booksList",
            data: {
                page: 1,
                limit: 10
            },
            success: this.handleGetBooksListSucc.bind(this)
        })
    }
    handleGetBooksListSucc(data) {
        //保存数据
        this.data = data.data.list;

        let str = "";
        for (var i = 0; i < data.data.list.length; i++) {
            str += `
           <tr>
           <td>${i}</td>
           <td>${data.data.list[i].booksAuth}</td>
           <td>${data.data.list[i].booksName}</td>
           <td>${data.data.list[i].booksStatus}</td>
           <td style="width:90px">
               <img src="${data.data.list[i].booksLogo}"/>
           </td>
           <td>${data.data.list[i].booksPrice}</td>
           <td data-id="${data.data.list[i]._id}">
               <button type="button" class="btn btn-link modify" 
               data-toggle="modal" 
               data-target="#booksModify">修改</button>
               <button type="button" class="btn btn-link delete">删除</button>
           </td>
       </tr>
           `
        }
        this.container.find(".booksList tbody").html(str);
        this.modifyEach();
        this.fileChange();
        this.saveDataClick();
        this.deleteEach();
        this.show();
    }
    modifyEach() {
        $.each(this.container.find(".modify"), this.handleModifyEachCb.bind(this))
    }
    handleModifyEachCb(index) {
        this.container.find(".modify").eq(index).on("click", this.handleModifyClick.bind(this, index))
    }
    handleModifyClick(index) {
        let id = this.container.find(".modify").eq(index).parent().attr("data-id");
        for (var i = 0; i < this.data.length; i++) {
            if (this.data[i]._id == id) {
                this.container.find("#booksAuth").val(this.data[i].booksAuth);
                this.container.find("#booksName").val(this.data[i].booksName);
                this.container.find("#booksStatus").val(this.data[i].booksStatus);
                this.container.find("#booksPrice").val(this.data[i].booksPrice);
                this.container.find("#booksLogo").attr("data-url", this.data[i].booksLogo);
                var img = $("<img/>");
                img.attr("src", this.data[i].booksLogo);
                img.css({
                    width: 90,
                    height: 120
                })
                this.container.find(".upload>div").html(img);
                this.container.find("#books_form").attr("data-id", this.data[i]._id);
                break;
            }
        }
    }
    fileChange() {
        this.container.find("#booksLogo").on("change", this.handleFileChange.bind(this))
    }
    handleFileChange() {
        let file = this.container.find("#booksLogo")[0].files[0];
        //模拟form上传
        let formData = new FormData();
        formData.append("booksLogo", file);

        $.ajax({
            type: "post",
            url: "/upload/urlImage",
            data: formData,
            contentType: false,
            processData: false,
            cache: false,
            success: this.handleUploadSucc.bind(this)
        })
    }
    handleUploadSucc(data) {
        if (data.data.urlImage) {
            let img = $("<img/>");
            img.attr("src", data.data.urlImage);
            img.css({
                width: 90,
                height: 120
            })
            this.container.find(".upload div").html(img);
            this.container.find("#booksLogo").attr("data-url", data.data.urlImage)
        }
    }
    saveDataClick() {
        this.container.find("#saveData").on("click", this.handleSaveDataClickCb.bind(this))
    }
    handleSaveDataClickCb() {
        let booksAuth = this.container.find("#booksAuth").val();
        let booksName = this.container.find("#booksName").val();
        let booksStatus = this.container.find("#booksStatus").val();
        let booksPrice = this.container.find("#booksPrice").val();
        let booksLogo = this.container.find("#booksLogo").attr("data-url");
        let id = this.container.find("#books_form").attr("data-id")

        $.ajax({
            type: "post",
            url: "/books/modify",
            data: {
                booksAuth, booksName, booksStatus, booksPrice, booksLogo, id
            },
            success: this.handleModifySucc.bind(this)
        })
    }
    handleModifySucc(data) {
        if (data.data.status == 1) {
            alert(data.data.info);
            $('#booksModify').modal('hide');
            this.getBooksList();
        } else {
            alert(data.data.info)
        }
    }
    deleteEach() {
        $.each(this.container.find(".delete"), this.handleDeleteEachCb.bind(this))
    }
    handleDeleteEachCb(index) {
        this.container.find(".delete").eq(index).on("click", this.handleDeletClick.bind(this, index))
    }
    handleDeletClick(index) {
        let id = this.container.find(".delete").eq(index).parent().attr("data-id");
        $.ajax({
            type: "get",
            url: "/books/delete",
            data: {
                id: id
            },
            success: this.handleDeleteSucc.bind(this)
        })
    }
    handleDeleteSucc(data) {
        if (data.data.status == 1) {
            alert(data.data.info);
            this.getBooksList();
        } else {
            alert(data.data.info);
        }
    }
    show(){
        console.log(this.container.find("#cold"))
    }
}

BooksList.template = `
    <div class="booksList">
        <form class="form-inline">
            <div class="form-group">
            <select class="form-control show">
                <option>全部</option>
                <option id="cold">冷宫里</option>
                <option id="young">如狼似虎</option>
            </select>
            </div>
            <div class="form-group">
                <input type="text" class="form-control" placeholder="请输入关键字"/>
            </div>
            <button class="btn btn-primary">排序</button>
        </form>
        <table class="table table-striped">
            <thead>
                <tr>
                    <th>妃子ID</th>
                    <th>妃子他爹</th>
                    <th>妃子名称</th>
                    <th>妃子状态</th>
                    <th>妃子容貌</th>
                    <th>妃子年龄</th>
                    <th>操作</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>001</td>
                    <td>叶赫那拉·惠征</td>
                    <td>慈禧</td>
                    <td>如狼似虎</td>
                    <td style="width:90px">
                        <img src="http://localhost:3000/img/timg.png"/>
                    </td>
                    <td>
                        <button type="button" class="btn btn-link">换一个</button>
                        <button type="button" class="btn btn-link">打入冷宫</button>
                    </td>
                </tr>
            </tbody>
        </table>
        <div class="modal fade" tabindex="-1" role="dialog" id="booksModify">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title">换妃子</h4>
                    </div>
                    <div class="modal-body">
                        <form id="books_form">
                            <div class="form-group">
                            <label for="booksAuth">妃子他爹</label>
                            <input type="text" class="form-control" id="booksAuth" placeholder="请输入妃子他爹">
                            </div>
                            <div class="form-group">
                                <label for="booksName">妃子名称</label>
                                <input type="text" class="form-control" id="booksName" placeholder="请输入妃子名称">
                            </div>
                            <div class="form-group">
                                <label for="booksStatus">妃子状态</label>
                                <select class="form-control" id="booksStatus">
                                    <option>如狼似虎</option>
                                    <option>冷宫里</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="booksPrice">妃子年龄</label>
                                <input type="number" class="form-control" id="booksPrice" placeholder="请输入妃子年龄">
                            </div>
                            <div class="form-group upload">
                                <div>上传妃子图片</div>
                                <input type="file" id="booksLogo" >
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" id="saveData">保存妃子数据</button>
                    </div>
                </div>
            </div>
        </div>   
    </div>
`