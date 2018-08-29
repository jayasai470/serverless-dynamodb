var serverless = require('serverless-http');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var config = require('./config');

var app = express();

app.disable('x-powered-by');

app.use(bodyParser.json({ strict: false}));
app.use(bodyParser.urlencoded({
  limit: '10mb',
  extended: true
}));

var index = require('./routes/index');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(express.static('public'));

app.use('/', index);

module.exports.handler = (event, context, callback) => {
  //to keep lambda warm and return out to use less memory for processing
  if(event.wakeup === config.WARMUP_EVENT) return callback(null, 'lambda is awaken')
  serverless(app)(event, context, callback)
}