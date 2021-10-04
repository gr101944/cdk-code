'use strict';

var lexResponses = require('../lexResponses');

module.exports = function (sessionAttributes, intentRequest, slots, callback) {

  var data = "Good bye now!"

  var message = {
    contentType: 'PlainText',
    content:  data
  }


  callback (lexResponses.close(intentRequest.sessionAttributes,"Fulfilled", message, null))

}
