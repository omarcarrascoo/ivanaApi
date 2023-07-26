const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
    {
        title : {type: String, required: true, unique: true},
        desc: {type: String, required: true},
        img: {type: Array, default: {}},
        categories: {type: Array},
        size: {type: String, required: true},
        keyWords: {type: Array} ,
        price: {type: Number, required: true},
        author: {type: String, required: true},
    },
    {timestamps: true}
);
module.exports = mongoose.model("Product", ProductSchema);