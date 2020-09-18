const mongoose = require('mongoose');

try {
  mongoose.connect('mongodb://matheus-soutto:Matheus.13@hackerrank-shard-00-00.jyajn.mongodb.net:27017,hackerrank-shard-00-01.jyajn.mongodb.net:27017,hackerrank-shard-00-02.jyajn.mongodb.net:27017/Deliverymen?ssl=true&replicaSet=HackerRank-shard-0&authSource=admin&retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});
  mongoose.Promise = global.Promise;
}
catch(error) {
  console.log(error);
}

module.exports = mongoose;