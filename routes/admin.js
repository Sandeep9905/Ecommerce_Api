const express = require('express');
const { sign } = require('jsonwebtoken');
const router = express.Router();
const {getAllOrderList ,createProduct ,addAccount ,signup ,signin} = require('../handlers/admin');
const {updateProduct , deleteProduct} = require('../handlers/product');
const {ensureCorrectAdmin} = require('../middleware/admin');


// router.post('/sign_up',signup);
router.post('/sign_in',signin);
router.get('/all_orders' , ensureCorrectAdmin , getAllOrderList);
router.post('/add_product' , ensureCorrectAdmin , createProduct)
router.post('/add_account' , ensureCorrectAdmin , addAccount);
router.put('/:product_id/edit_product' , ensureCorrectAdmin , updateProduct);          
router.delete('/:product_id/delete_product' , ensureCorrectAdmin , deleteProduct);

module.exports = router;