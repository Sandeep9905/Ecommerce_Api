const jsonwebtoken = require('jsonwebtoken');
const db = require('../models');

//signin functionality for user
exports.signin = async function(req ,res ,next){
    try{
        let user = await db.User.findOne({
            email:req.body.email
        })
        let {id ,username ,avatar} = user;
        let isMatch = await user.comparePassword(req.body.password);
        if(isMatch){
           let token = jsonwebtoken.sign({
               id,
               avatar,
               username
           }, process.env.SECRET_KEY );
           
           return res.status(200).json({
               id,
               avatar,
               token,
               username
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

//signup functionality for user
exports.signup = async function(req ,res ,next){
   try{
     let user = await db.User.create(req.body);
     let {id , username ,avatar} = user;
     let token = jsonwebtoken.sign({
         id,
         avatar,
         username
     },process.env.SECRET_KEY);
     return res.status(200).json({
         id,
         username,
         avatar,
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