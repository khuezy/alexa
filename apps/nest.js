var alexa = require('alexa-app');

var nestApp = new alexa.app('nest');

nestApp.launch(function(req, res) {
  res.say('Nest app launched!');
});

nestApp.intent('TestIntent', {
  slots: {},
  utterances: [
    "go"
  ],
  function(req, res) {
    console.log(req);
    res.say("go!");
  }
})

module.exports = nestApp;
