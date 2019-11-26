class Login{
    constructor(container){
        this.container=container;
        this.init();
    }
    init(){
        this.createForm();
    }
    createForm(){
        this.container.html(Login.template);
        this.toggleClick();
        this.formSubmit();
    }
    toggleClick(){
        this.container.find(".toggle").on("click",this.handleToggleClickCb.bind(this))
    }
    handleToggleClickCb(){
        new Page().createForm(false)
    }
    formSubmit(){
        this.container.find("#user_form").on("submit",this.handleFormSubmitCb.bind(this))
    }
    handleFormSubmitCb(e){
        e.preventDefault();
        let username=this.container.find("#login_username").val();
        let password=this.container.find("#login_password").val(); 

        $.ajax({
            type:"post",
            url:"/users/login",
            data:{
                username,
                password
            },
            success:this.handleFormSubmitSucc.bind(this)
        })
    }
    handleFormSubmitSucc(data){
        console.log("fhsdla");
        if(data.data.status == 1){
            alert(data.data.info);
            window.location.href="http://localhost:3000/html/list.html";
        }else{
            alert(data.data.info)
        }
    }
}
Login.template=
    `<div class="form_logo">
        <img src="http://localhost:3000/img/logo.png"/>
    </div>
    <form id="user_form">
        <div class="form-group">
            <label for="login_username">皇帝名</label>
            <input type="text" class="form-control" id="login_username" placeholder="请输入皇帝名">
        </div>
        <div class="form-group">
            <label for="login_password">密码</label>
            <input type="password" class="form-control" id="login_password" placeholder="请输入密码">
        </div>
        <p class="bg-info toggle">没有账号,立即注册</p>
        <button type="submit" class="btn btn-primary form_btn">立即登陆</button>
    </form>
`