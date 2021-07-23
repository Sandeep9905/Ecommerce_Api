const express = require('express');
const router = express.Router({mergeParams:true});
const {createOrder ,getParticularOrder ,cancelOrder} = require('../handlers/order');


//Creating Order by User
router.route('/:product_id').post(createOrder);
//Canceling Order by User
router.route('/:order_id/').delete(cancelOrder);

module.exports = router;