'use strict';

var lexResponses = require('../lexResponses');
var needle = require('needle');
var random = require('../helper/random');
var bo = require('../helper/buildOptions');
var brc = require('../helper/buildResponseCard');
var scanTrans = require('../helper/scanTranscript');
var apiCallHandler = require('../API/apiCallHandler');
var config = require('../config.json');

var currIntentName;
var responseCard;
var options = [];
var optionMsg = "Options Message";


module.exports = function (sessionAttributes, intentRequest, slots, callback) {
  currIntentName = intentRequest.currentIntent.name;
  console.log (currIntentName);
  const source = intentRequest.invocationSource;
  console.log (source);
  if  (source === "DialogCodeHook"){
    console.log ("In DialogCodeHook")
  }//End of DialogCodeHook

  if (source === "FulfillmentCodeHook") {
    var message = {
      contentType: 'PlainText',
      content: "Please choose:"
    }
    options = bo.buildOptions("main");
    var title = "Your options";
    var subtitle = " ";
    var imageOption = "someURL.PNG";
    responseCard = brc.buildResponseCard(title,subtitle,options,null);
    console.log("responseCard " + JSON.stringify(responseCard));
    callback (lexResponses.close(sessionAttributes,"Fulfilled", message, responseCard));
  }//end Fullfillment
}//end of function
