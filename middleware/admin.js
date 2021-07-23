require('dotenv').config();
const jwt = require('jsonwebtoken');

exports.ensureCorrectAdmin = function(req ,res ,next){
    try{
      let token = req.headers.authorization.split(' ')[1];
      jwt.verify(token , process.env.ADMIN_SECRET_KEY , function(err ,decoded){
         if(decoded && decoded.iat == process.env.SECRET){
               return next();
         }else{
             return next({
                 status:401 ,
                 message:'Unauthorized!!!!'
             });
         }
      })
    }catch(err){
        return next({
            status:401 ,
            message:'Unauthorized!!!!'
        });
    }
}