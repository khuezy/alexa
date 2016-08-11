let alexa = require('alexa-app');

const nestApp = new alexa.app('nest');

nestApp.launch((req, res) => {
  res.say('Nest app launched!');
});

nestApp.intent('testIntent', {
  slots: {},
  utterances: [
    "go"
  ],
  function(req, res) {
    res.say("go!");
  }
})

module.exports = nestApp;
