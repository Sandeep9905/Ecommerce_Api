const mongoose = require('mongoose');
const User = require('./user');

const orderSchema = new mongoose.Schema({
    quantity:{
        type:Number,
        required:true,
        default:0
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    product:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'Product'
    }
},{
  timestamps:true
});


orderSchema.pre('remove',async function(next){
  try{
    let user = await User.findById(this.user);
    user.orders.remove(this.id);
    await user.save();
    return next();
  }catch(err){
      return next(err);
  }
})

const Order = mongoose.model('Order',orderSchema);
module.exports = Order;