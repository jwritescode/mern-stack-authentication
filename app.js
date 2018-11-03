var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');

var book = require('./routes/book');
var auth = require('./routes/auth');
var app = express();

var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
//mongoose.connect('mongodb://bagz:secretpassword123@127.0.0.1:27017/merndb', { promiseLibrary: require('bluebird') })
mongoose.connect('mongodb://127.0.0.1:27017/?3t.connectTimeout=10000&3t.connection.name=server-merndb&3t.connectionMode=direct&3t.proxyType=default&3t.proxyHost=&3t.proxyPort=&readPreference=primary&3t.proxyProtocol=&3t.sshAddress=18.225.14.187&3t.sshUser=bagz&3t.sshPKPath=/home/bagz/johnwritescodeputty.ppk&3t.ssh=true&3t.sshUsePKPassphrase=false&3t.uriVersion=3&3t.sshAuthMode=privateKey&3t.socketTimeout=0&3t.sshPort=22', { promiseLibrary: require('bluebird') })
  .then(() =>  console.log('connection succesful'))
  .catch((err) => console.error(err));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended':'false'}));
app.use(express.static(path.join(__dirname, 'build')));

app.use('/api/book', book);
app.use('/api/auth', auth);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
