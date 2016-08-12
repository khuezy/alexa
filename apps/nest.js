let alexa = require('alexa-app');

const nestApp = new alexa.app('nest');

nestApp.launch((req, res) => {
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
