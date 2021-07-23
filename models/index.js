const mongoose = require('mongoose');

mongoose.set('debug',true);
mongoose.Promise = Promise;

mongoose.connect('mongodb://localhost:27017/myapp', {useNewUrlParser: true ,useUnifiedTopology: true,useFindAndModify:false});


module.exports.User = require('./user');
module.exports.Product = require('./products');
module.exports.Order = require('./orders');
module.exports.Admin = require('./admin');