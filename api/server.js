const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(cors({ origin: '*' }));

app.use(bodyParser.json({limit: '2mb'}));
app.use(bodyParser.urlencoded({limit: '2mb', extended: false}));

require('./controllers/authController')(app);
require('./controllers/deliverymenController')(app);

app.use('/', async (req, res) => {
  try {
    res.send('OK');
  }
  catch (error) {
    console.log('API não OK');
    console.log(error);
  }
});


app.listen(3002, '0.0.0.0');