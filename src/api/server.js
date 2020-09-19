const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(cors({origin: 'http://127.0.0.1:3000'}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

require('./controllers/deliverymenController')(app);
require('./controllers/authController')(app);

app.use('/', async (req, res) => {
  try {
    res.send('OK');
  }
  catch (error) {
    console.log('API não OK');
    console.log(error);
  }
});


app.listen(3002);