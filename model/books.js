const mongoose = require("../utils/database");

const Books = mongoose.model("book",{
    booksAuth:String,
    booksName:String,
    booksStatus:String,
    booksPrice:Number,
    booksLogo:String
})


const booksSave = (booksInfo)=>{
    let books = new Books(booksInfo);
    return books.save();
}


const booksPage = (page,limit)=>{
    page = Number(page);
    limit = Number(limit);
    return Books.find().skip((page-1)*limit).limit(limit);
}

const booksUpdate = (id,booksInfo)=>{
    return Books.update({_id:id},booksInfo)
}

const booksDelete = (id)=>{
    return Books.remove({_id:id});
}

module.exports = {
    booksSave,
    booksPage,
    booksUpdate,
    booksDelete
}