const express = require('express'); const MongoClient = require('mongodb').MongoClient; const bodyParser = require('body-parser');
const app = express();
const port = 3300;
require('./app/routes')(app, {}); app.listen(port, () => { console.log('We are live on ' + port); });