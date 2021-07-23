require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const errorHandler = require('./handlers/error');
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/product'); 
const orderRoutes = require('./routes/orders');
const adminRoutes = require('./routes/admin');

const {loginRequired , ensureCorrectUser} = require('./middleware/auth');
const {ensureCorrectAdmin} = require('./middleware/admin');
const PORT = 5000;
app.use(cors());

// to  get req.body data in API
app.use(
    express.urlencoded({
      extended: true
    })
  )
app.use(express.json())
  


//All routes 
app.use('/api/auth',authRoutes);
app.use('/api/admin',adminRoutes);

app.use('/api/product'
        ,loginRequired                
       ,productRoutes);

app.use('/api/user/:id/order'
         ,loginRequired
        , ensureCorrectUser
        ,orderRoutes);


//handling error 
app.use(function(req ,res ,next){
    let err = new Error('Not Found!');
    err.status = 404;
    next(err);
})
app.use(errorHandler)

//listening to PORT 5000
app.listen(PORT ,()=>{
    console.log(`Server is running on port ${PORT}`);
})

