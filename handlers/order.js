const db = require('../models');

exports.createOrder = async function(req ,res ,next){
    try{
      let order = await db.Order.create({
          quantity:req.body.quantity,
          user:req.params.id,
          product:req.params.product_id
      })
      let foundUser = await db.User.findById(req.params.id);
      foundUser.orders.push(order.id);
      await foundUser.save();
      let foundOrder = await db.Order.findById(order.id).populate('user',{
          username:true,
          avatar:true
      }).populate('product').exec(function(err ,order){
          if(err){
              return next(err);
          }else{
            return res.status(200).json(order);
          }
      })
    }catch(err){
      return next(err);
    }
}

exports.getParticularOrder = async function(req ,res ,next){
    try{
       let getOrder = await db.Order.findById(req.params.order_id);
       return res.status(200).json(getOrder); 
    }catch(err){
       return next(err);
    }
}


exports.userOrderList = async function(req ,res ,next){
    try{
      let viewOrders = await db.User.findById(req.params.id);

    }catch(err){
        return next(err);
    }
}

exports.cancelOrder = async function(req ,res ,next){
    try{
      let foundOrder = await db.Order.findById(req.params.order_id);
      await foundOrder.remove();
      return res.status(200).json(foundOrder);
    }catch(err){
        return next(err);
    }
}