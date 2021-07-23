const db = require('../models');
const jsonwebtoken = require('jsonwebtoken');

//signin functionality for Admin
exports.signin = async function(req ,res ,next){
    try{
        let admin = await db.Admin.findOne({
            email:req.body.email
        })
        let {id ,avatar,username} = admin;
        let isMatch = await admin.comparePassword(req.body.password);
        if(isMatch){
           let token = jsonwebtoken.sign({
               id,
               avatar,
               username
           }, process.env.ADMIN_SECRET_KEY );
           
           return res.status(200).json({
               id,
               avatar,
               username,
               token
           })
        }else{
           return next({
               status:400,
               message:'Invalid Email/Password.'
           });
        }
    }catch(err){
        return next({
            status:400,
            message:'Inavlid Email/Password'
        })
    }
}

//signup functionality for Admin
exports.signup = async function(req ,res ,next){
   try{
     let admin = await db.Admin.create(req.body);
     let {id ,avatar,username} = admin;
     let token = jsonwebtoken.sign({
         id,
         avatar,
         username
     },process.env.SECRET_KEY);
     return res.status(200).json({
         id,
         avatar,
         username,
         token
     })
   }catch(err){
      if(err.status === 11000){
          err.message = 'Sorry that username and/or Email is taken.'
      }
      return next({
          status:200,
          message:err.message
      });
   }
}

//Get All OrderList that has been created by user
exports.getAllOrderList = async function(req ,res ,next){
    try{
     let orders = await db.Order.find()
                                .sort({createtAt:'desc'})
                                .populate('user',{
                                    username:true ,
                                    avatar:true
                                }).populate('product');
     return res.status(200).json(orders);                           
    }catch(err){
        return next(err);
    }
}

//Adding Products functionality by Admin
exports.createProduct = async function(req ,res , next){
    try{
     let product = await db.Product.create(req.body);
     let {product_name ,
          product_image,
          product_description,
          product_price
         } = product;
     product.save();
     return res.status(200).json({
        product_name ,
        product_image,
        product_description,
        product_price
     })
    }catch(err){
       return next(err);
    }
}

//Adding User functionality by Admin
//In adding the account of any user Admin can create it but changing of password route has not been created ... 
exports.addAccount = async function(req ,res ,next){
    try{
     let createAccount = await db.User.create(req.body);
     await createAccount.save();
     return res.status(200).json({
         messge:'Account created successfully!'
     })
    }catch(err){
        return next(err);
    }
}
