const express = require('express');
const helmet = require('helmet');
const http = require('http');
const bodyParser = require('body-parser');
const app = express();

const config = require('./config.js');

app.use(helmet());  

const name = require('./routes/name.js');

// <REQUIRES> DON'T CHANGE THIS LINE - Route file requires will be added above here.

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Express Routing
app.use('/name', name);

// <ROUTING-E> DON'T CHANGE THIS LINE - Express routing will be added above here.

// React Routing

// <ROUTING-R> DON'T CHANGE THIS LINE - React routing will be added above here.

http.createServer(app).listen(config.app.port);

module.exports = app;