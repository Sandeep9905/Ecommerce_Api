const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    company:{
        type:String,
        required:true
    },
    product_name:{
        type:String,
        required:true,
        maxLength:70
    },
    product_description:{
        type:String,
        required:true,
        maxLength:150
    },
    product_price:{
        type:Number,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    product_image:{
        type:String,
        required:true
    }
})

const Product = mongoose.model('Product',productSchema);

module.exports = Product;