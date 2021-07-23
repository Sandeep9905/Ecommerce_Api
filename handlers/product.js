const db = require('../models');

exports.getAllProducts = async function(req ,res , next){
    try{
       let products = await db.Product.find();
       return res.status(200).json(
           products
       )
    }catch(err){
        return next(err);
    }
}

exports.updateProduct = async function(req ,res , next){
    try {
        const product = await db.Product.findByIdAndUpdate(req.params.product_id, 
          req.body, { new: true, runValidators: true });
        return res.status(201).json(product)
      } catch (err) {
        return next(err)
      }
}

exports.deleteProduct = async function(req ,res , next){
    try{
       let foundProduct = await db.Product.findById(req.params.product_id);
       await foundProduct.remove();
       return res.status(200).json(foundProduct);
    }catch(err){
        return next(err);
    }
}