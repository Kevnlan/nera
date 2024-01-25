const express = require('express'); const MongoClient = require('mongodb').MongoClient; const bodyParser = require('body-parser');
const app = express();
const port = 3300;
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/status", (request, response) => {
    const status = {
       "Status": "Running"
    };
    
    response.send(status);
 });
require('./app/routes')(app, {}); app.listen(port, () => { console.log('We are live on ' + port); });