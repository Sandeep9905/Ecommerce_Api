const express = require('express');
const router = express.Router();
const {getAllProducts} = require('../handlers/product');

//Get All Products 
router.get('/get_allproducts', getAllProducts);

module.exports = router;

