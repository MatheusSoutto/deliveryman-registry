const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://matheus-soutto:Matheus.13@hackerrank-jyajn.mongodb.net/Deliverymen?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;

module.exports = mongoose;