'use strict';

var lexResponses = require('../lexResponses');
var salutation = require('../helper/greeting');
var random = require('../helper/random');

module.exports = function (sessionAttributes, intentRequest, slots, callback) {

  var salute = salutation.salute()

  var greetingsArray = ["Hi, whats up?", "Hello there, how can I help you?", "Hey, try asking me a question!", "Hi, what are you looking for today?"]
  var rnd = random.getRandomInt(0,(greetingsArray.length -1));

  var data = salute + greetingsArray[rnd];

  var message = {
    contentType: 'PlainText',
    content:  data
  }


  callback (lexResponses.close(intentRequest.sessionAttributes,"Fulfilled", message, null))

}
