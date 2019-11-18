#### 网址
* [模态框](https://v3.bootcss.com/javascript/#modals)
* [postman(接口测试)](https://www.getpostman.com)
* [echarts](https://www.bootcdn.cn/echarts/)
* [富文本教程](https://blog.csdn.net/flyingwufei/article/details/80841128)
* [token](https://www.npmjs.com/package/jsonwebtoken)
* [cookie-parser](http://www.expressjs.com.cn/en/resources/middleware/cookie-parser.html)
* [mdn](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript)
* [bootcdn(封装cookie)](https://www.bootcdn.cn/js-cookie/)
* 引入的文件(引入js文件时要注意顺序)
    * "https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css"
    * "https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/js/bootstrap.min.js"
    * "jquery-1.11.3.js"

    

## 步骤
#### 登录注册
* 注册接口   
  * 请求方式：post
  * 请求地址：/user/register
  * 请求参数
    * 字段名称    字段类型    是否必填    参数说明
      username     string      Y         用户名称
  * 返回值参数
    * 字段名称    字段类型      参数说明
       code       number        状态码
       errMsg     string        报错信息
       data       object        info:"注册成功"
                                status:1 成功  2重复  0系统错误
  * [聚合数据](https://www.juhe.cn/docs/api/id/54)


* express -e 生成项目模板
* supervisor  把node改为supervisor 
* cnpm install 安装依赖
* npm start (只有start 不用run)
* cnpm  install mongoose -S
* cnpm install jsonwebtoken -S
* cnpm install cookie-parser(不用装)
* public js    public中为前端代码  public外为后端代码 前后端分离
    * common 公共文件
    * lib 类库
    * plugin 插件
    * js 自己写的js 
* 发起ajax请求  POST请求时
    * app.js
        * `app.use('/users', usersRouter);`
        * `var usersRouter = require('./routes/users');`
    * routes 创建  users.js
        
        `var express = require('express');
        var router = express.Router();
        const userController = require("../controller/user")
        router.post("/register", userController.userRegister)
        router.post("/login", userController.userLogin);
        module.exports = router;`
    * 新建controller (逻辑层=>编写功能的业务逻辑)
        * 新建user.js 
        * 里面写userRegister方法
            * `const userModel=require("../model/user")`
            * `const userRegister=async (req,res)=>{
                let {username,password}=req.body;
                let findData=await userModel.userFind({username});
            if(){}else{}}`
    * `module.exports={userRegister}`
* 新建model (数据层==>数据的增删改查)
        * `const mongoose=require("../utils/database");`
        * `const User = mongoose.model("user",{
            username:String,
            password:String,
            name:String,
            registerTime:Number,
            status:Boolean
        })
        const userFind = (userInfo)=>{
            return User.findOne(userInfo);
        }`
        * `module.exports = {
            userFind,
        }`
    * 新建utils(工具库)
        * `const mongoose = require("mongoose");
        const db_path = "mongodb://127.0.0.1:27017/zhangyu";
        mongoose.connect(db_path);
        module.exports = mongoose;`
    
    * [加密模块](http://nodejs.cn/api/crypto.html)
      
      * `const crypto = require('crypto');//引入加密模块`
  * `const hash = crypto.createHash('sha256');//创建加密算法`
    * `hash.update(password);//加密数据`
    *  `console.log(hash.digest("hex"));//得到数据`
##### 登录注册代码模板
*   `class Page{
        constructor(){
            this.container=$(".container");
        }
        init(){
            this.createForm();
        }
        createForm(flag){
            if(flag){
                this.login=new Login(this.container);
            }else{
                this.register=new Register(this.container);
            }
        }
    }`
   ` new Page().init();`


*   `class Register{
        constructor(container){
            this.container=container;
            this.init();
        }
        init(){
            this.createForm();
        }
        createForm(){
            this.container.html(Register.template);
            this.toggleClick();
            this.formSubmit();
        }`

        切换页面
        toggleClick(){
            this.container.find("切换按钮类名").on("click",this.handleToggleClick.bind(this));
        }
        handleTogglelClick(){
            new Page().createRorm(true);
        }
    
        提交数据
        formSubmit(){
            this.container.find("提交按钮").on("click",this.handleFormSubmit.bind(this));
        }
        handleFormSubmit(e){
            e.preventDefault();
            let name=this.container.find("**").val();
            $.ajax({
                type:"POST",
                url:"",
                data:{}
                success:this.handleFormSubmitSucc.bind(this);
            })
        }
        handleFormSubmitSucc(data){
            if(){
    
            }else{
    
            }
        }
    }
    Register.temple=`***`



##### 笔记
* 登录注册提交时用form 表单提交 给form加id (阻止默认事件)
* key 值和val值一样  只用写一个
* vue 中接口少 所以在定义字段的时候尽量写多点username password name registertime status
* 自动生成随机字符串
    * let sub=Math.random().toString(36).substr(2,8);
* 登录时的密码也需要加密一次(注册时已加密)
* postman 使用时要用完整的地址
    * http://localhost:3000/users/login
    * post   --->body
    * get    --->params
* 页面跳转
    * window.location.href=" ";
    * new Page().creat(true);
*  $.each(arr1,function(i,val){ //两个参数，第一个参数表示遍历的数组的下标，第二个    参数表示下标对应的值
* 上传图片
    * <input type="file" id="yu">;  #yu{opacity:0} 
    * 上传图片时 绑定onchange 事件
    * let file=this.container.find("#bookimg")[0].files[0]
    * files 只有原生js有.files 属性
    * ajax模拟form表单数据提交
        * let formData = new FormData();
        * formData.append("booksLogo",file)第一个参数是字段名称，第二个参数是上传文件
        * $.ajax({
            type:"post",
            url:"/upload/urlImage",
            data:formData,
            contentType:false,// 不用之前的类型 
            processData:false,//防止jquery进行数据解析
            cache:false,//缓存
            success:this.handleUploadSucc.bind(this)
        })
        * [中间件](http://www.expressjs.com.cn/en/resources/middleware/multer.html)
        * cnpm install --save multer==cnpm install multer -S(如果出问题        cnpm install)
        * demo 官方文档上demo
            * `const multer = require("multer");
            var storage = multer.diskStorage({
                destination: function (req, file, cb) {
                    cb(null, './public/img') //设置文件存储的位置
                }, 
                filename: function (req, file, cb) {
                    cb(null, Date.now()+"-"+file.originalname )
                }   //设置文件的唯一名称
            })
            //使用配置
            var upload = multer({ storage: storage })
            //设置当前字段最多可以上传多少张图片
            var cpUpload = upload.fields([{ name: 'booksLogo', maxCount: 1 }])
            module.exports = cpUpload;`
*  数量 input type=number

* 遍历的时候不要用id 因为id值是唯一的
* 


























































* mongod --dbpath c:\data\db
* mongo
* npm run start (run可省略)
* 
* 安装新模块时 cnpm install