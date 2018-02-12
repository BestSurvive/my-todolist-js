var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
var creator = require('./routes/creator');
var assigne = require('./routes/assigne');

app.use('/creator', creator);
app.use('/assigne', assigne);

app.listen(3001);
module.exports = app;
