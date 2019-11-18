const express = require("express");
const router = express.Router();
const booksController = require("../controller/books");
const authUtils=require("../utils/token")
//添加书籍
router.post("/addbooks",booksController.addbooks)
// 获取书籍
router.get("/booksList",authUtils.tokenVerfiy,booksController.booksList)
// //修改书籍
router.post("/modify",booksController.booksModify)
// //删除
router.get("/delete",booksController.booksDelete)
module.exports = router;