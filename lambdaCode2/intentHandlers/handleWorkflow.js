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
    var indexId = "";
    var queryInfo = "";
    var urlKendra = apiCallHandler.getKendra(indexId, queryInfo );
    console.log ("urlKendra " + urlKendra);
    needle.get(urlKendra, function(error, response) {
      if (!error && response.statusCode == 200){
        console.log(response.body);
      }
    });
  }//End of DialogCodeHook

  if (source === "FulfillmentCodeHook") {
    var message = {
      contentType: 'PlainText',
      content: optionMsg
    }
    options = bo.buildOptions("main");
    var title = "Title";
    var subtitle = " ";
    var imageOption = "someURL.PNG";
    responseCard = brc.buildResponseCard(title,subtitle,options,null);
    console.log("responseCard " + JSON.stringify(responseCard));
    callback (lexResponses.close(sessionAttributes,"Fulfilled", message, responseCard));
  }//end Fullfillment
}//end of function
