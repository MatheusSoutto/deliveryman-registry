const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');
const path = require('path');
const fs = require('fs');
const cors = require('cors');

const app = express();

app.use(cors({ origin: '*' }));

app.use(express.static(path.join(__dirname, './../client/build')));

app.use(bodyParser.json({limit: '2mb'}));
app.use(bodyParser.urlencoded({limit: '2mb', extended: false}));

require('./controllers/authController')(app);
require('./controllers/deliverymenController')(app);

app.use('/*', async (req, res) => {
  res.sendFile(path.join(__dirname, './../client/build', 'index.html'));
});

const sslServer = https.createServer(
  {
    key: fs.readFileSync(path.join(__dirname, 'cert', 'key.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem'))
  },
  app
)

sslServer.listen(3000, () => console.log('Secure server'));
//app.listen(3000, '0.0.0.0');