const mongoose = require('mongoose');

try {
  mongoose.connect('mongodb://mongo:27017', {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true});
  mongoose.Promise = global.Promise;
}
catch(error) {
  console.log(error);
}

module.exports = mongoose;