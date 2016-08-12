// Start up the server
var express = require('express');
var https = require('https');
var pem = require('pem');
var bodyParser = require('body-parser');
var alexaApp = require('./apps/nest');



pem.createCertificate({days:1, selfSigned:true}, function(err, keys) {
  var app = express();
  var PORT = process.env.PORT || 4300;
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  app.get('/test', function(req, res) {
    console.log('testing...');
    res.send('hi');
  });

  alexaApp.express(app, "/echo/");

  https.createServer({key: keys.serviceKey, cert: keys.certificate}, app).listen(4300);
  console.log("Listening on port "+PORT);
});

process.on('uncaughtException', function(err) {
  console.error(err);
  console.log('oops...');
});
