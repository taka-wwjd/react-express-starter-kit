const express = require('express');
const helmet = require('helmet');
const http = require('http');
const bodyParser = require('body-parser');
const app = express();

const configApp = require('./config/app.js');

app.use(helmet());  

// Express Route File Requires
const api_name = require('./api/name.js');

// <REQUIRES> DON'T CHANGE THIS LINE - Express route file requires will be added above here.

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Express Routing
app.use('/api/name', api_name);

// <ROUTING-E> DON'T CHANGE THIS LINE - Express routing will be added above here.

// React Routing

// <ROUTING-R> DON'T CHANGE THIS LINE - React routing will be added above here.

http.createServer(app).listen(configApp.port);

module.exports = app;