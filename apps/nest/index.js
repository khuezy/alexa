var alexa = require('alexa-app');
var util = require('util');
var nest = require('unofficial-nest-api');

function login(name, pass, cb) {
  nest.login(process.env.NEST_NAME, process.env.NEST_PASS, function(err, login) {
    if (err) {
      console.log('unable to login');
      cb(err, null);
    } else {
      nest.fetchStatus(function(data) {
        var device = null;
        for (var deviceId in data.device) {
            if (data.device.hasOwnProperty(deviceId)) {
                device = data.shared[deviceId];
                console.log(util.format("%s [%s], Current temperature = %d F target=%d",
                    device.name, deviceId,
                    nest.ctof(device.current_temperature),
                    nest.ctof(device.target_temperature)));
                break; // only 1 thermostat
            }
        }
        cb(null, device)
      });
    }
  });
}

// Allow this module to be reloaded by hotswap when changed
module.change_code = 1;

// Define an alexa-app
var app = new alexa.app('nest');
app.launch(function(req,res) {
	res.say("Nest Thermostat.");
});
app.intent('ACIntent', {
		"slots":{"NAME":"LITERAL","MODE":"STRING"}
		,"utterances":["To turn the AC {on|off|MODE}"]
	},function(req,res) {
    login(process.env.NEST_NAME, process.env.NEST_PASS, function(err, device) {
      if (err) {
        res.say('There was a problem logging into nest.');
      } else {
        var mode = req.slot('MODE');
        var ctemp = +device.current_temperature - 1;
        nest.setTargetTemperatureType(null, mode, function(err, data) {
          nest.setTemperature(null, ctemp, function(err, data) {
            res.say(util.format('I turned %s the AC. Please close all the doors and windows.', mode));
          });
        });
      }
    });
	}
);
app.intent('AgeIntent', {
		"slots":{"AGE":"NUMBER"}
		,"utterances":["My age is {1-100|AGE}"]
	},function(req,res) {
		res.say('Your age is '+req.slot('AGE'));
	}
);
module.exports = app;
