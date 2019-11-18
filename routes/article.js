var express = require('express');
var router = express.Router();
const articleController = require("../controller/article")
router.post("/addArticle",articleController.addArticle);
router.get("/articlesList", articleController.articlesList)  
router.get("/content",articleController.articleContent)
router.get("/articledel",articleController.articleDel)
module.exports = router;