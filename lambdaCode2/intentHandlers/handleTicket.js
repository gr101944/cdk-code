'use strict';

var lexResponses = require('../lexResponses');
var needle = require('needle');
var axios = require('axios');
var random = require('../helper/random');
var bo = require('../helper/buildOptions');
var brc = require('../helper/buildResponseCard');
var scanTrans = require('../helper/scanTranscript');
var apiCallHandler = require('../API/apiCallHandler');
var config = require('../config.json');

var currIntentName;
var responseCard;
var options = [];
var optionMsg = "Sure";
const minRandom = 123456;
const maxRandom = 999888;

var ticketAreaSlotName = "ticketArea";
var issueFacedSlotName = "issueFaced";
var ticketArea = null;
var openTicket = null;
var issueFaced = null;
var accessToken = "";


module.exports = function (sessionAttributes, intentRequest, slots, callback) {

  currIntentName = intentRequest.currentIntent.name;
  console.log (currIntentName);
  const source = intentRequest.invocationSource;
  console.log (source);
  ticketArea = intentRequest.currentIntent.slots.ticketArea;
  openTicket = intentRequest.currentIntent.slots.openTicket;
  issueFaced = intentRequest.currentIntent.slots.issueFaced;
  console.log ("ticketArea " + ticketArea)
  if  (source === "DialogCodeHook"){
    if ((openTicket != null) && (ticketArea != null) && (issueFaced !=null)){
      console.log ("All slots full")


    }
    if ((openTicket != null) && (ticketArea != null) && (issueFaced === null)){
      console.log ("In DialogCodeHook")
      var message = {
        contentType: 'PlainText',
        content: "Issue?"
      }
      options = bo.buildOptions("problem");
      var title = "Please select";
      var subtitle = " ";
      var imageOption = "someURL.PNG";
      responseCard = brc.buildResponseCard(title,subtitle,options,null);
      console.log("responseCard " + JSON.stringify(responseCard));
      callback (lexResponses.elicitSlot(intentRequest.sessionAttributes,currIntentName,slots,issueFacedSlotName, message, responseCard));
    }
    if ((openTicket != null) && (ticketArea === null)){
      console.log ("In DialogCodeHook")
      var message = {
        contentType: 'PlainText',
        content: "Choose topic:"
      }
      options = bo.buildOptions("ticket");
      var title = "Please select";
      var subtitle = " ";
      var imageOption = "someURL.PNG";
      responseCard = brc.buildResponseCard(title,subtitle,options,null);
      console.log("responseCard " + JSON.stringify(responseCard));
      callback (lexResponses.elicitSlot(intentRequest.sessionAttributes,currIntentName,slots,ticketAreaSlotName, message, responseCard));
    }

    callback (lexResponses.delegate(sessionAttributes, slots))
  }//End of DialogCodeHook

  if (source === "FulfillmentCodeHook") {
    var date = new Date();

    //Generating ticket Number
    var datePortion = ( date.getFullYear() + ("0" + (date.getMonth() + 1)).slice(-2) + ("0" + date.getDate()).slice(-2) + ("0" + date.getHours() ).slice(-2) + ("0" + date.getMinutes()).slice(-2) + ("0" + date.getSeconds()).slice(-2) );
    var ticketNumber = "HRBot" + datePortion

    //Evaluating ticketArea
    switch(ticketArea) {
      case "100":
        ticketArea = "Benefits"
        break;
      case "200":
        ticketArea = "Covid"
      case "300":
        ticketArea = "Training"
        break;
      case "400":
        ticketArea = "Appraisal"
      case "500":
        ticketArea = "Cancel"
        break;
      default:
        ticketArea = "Not allowed"
    }
    //Evaluating issueFaced
    switch(issueFaced) {
      case "100":
        issueFaced = "Results unuseful"
        break;
      case "200":
        issueFaced = "No Results"
      case "300":
        issueFaced = "Timed out"
        break;
      case "400":
        issueFaced = "Need more info"
      case "500":
        issueFaced = "Cancel"
        break;
      default:
        issueFaced = "Not allowed"
    }
    if (ticketArea != "Other"){
      var msg = "A ticket has been raised for query regarding " + "<i>" +  ticketArea + "</i>"+ " : " + "<b>" + ticketNumber + "</b>" + "      ,Details have been sent to your eMail."
    } else {
      var msg = "A ticket has been raised :" + "<b>" + ticketNumber + "</b>" + "      ,Details have been sent to your eMail."
    }
    var message = {
      contentType: 'CustomPayload',
      content: msg
    }
    console.log (ticketNumber)
    console.log (ticketArea)
    console.log (issueFaced)
    if ((ticketArea === "Cancel") || (issueFaced === "Cancel")){
      var message = {
        contentType: 'CustomPayload',
        content: "Cancelled"
      }
      callback (lexResponses.close(sessionAttributes,"Fulfilled", message, null));
    }
    else
    {

      var name = "Rajesh Ghosh";
      var fromAddress = "rajesh.ghosh.here@gmail.com";
      var toAddress = "rajesh.ghosh@digitalsherpa.ai";
      var ticketNumber = ticketNumber;
      var templateName = "MyTemplate5";
      var urlEmail = apiCallHandler.sendEmail(name, toAddress, fromAddress, templateName, ticketNumber, ticketArea );
      console.log ("urlEmail " + urlEmail);

      //Get Token

      var urlWF = "http://ds-workflow.com/userapi/gatekeeper/signin"
      var useridWF = "rghosh";
      var passwordWF = "1qaz!QAZ";


      axios.post(urlWF, {
        userid: useridWF,
        password: passwordWF
      })
      .then(function (response) {
        console.log(response.data);
        accessToken = response.data.data.token;
        console.log(accessToken);
      })
      .catch(function (error) {
        console.log(error);
      });

      var userId = "Rajesh Ghosh";
      //Config item
      var units = 1;
      var lookBackHour = units * 60 * 60 * 1000;

      var qnaId =  ((new Date) - lookBackHour)


      var urlGetDB = apiCallHandler.getQnA(userId, qnaId );
      console.log (urlGetDB)
    //  module.exports.insertQnA = function (userId, qnaId, dateEntered, queryTxt, responseTxt) {
      needle.get(urlGetDB, function(error, response) {
        if (!error && response.statusCode == 200){
          var len  = response.body.Items.length
          console.log(len);
          var queryList = "";
          var jsonArr = [];
          var jsonArr2 = [];

          for (var i = 0;i <len;i++){

            jsonArr.push({

                id: i+1,
                query: response.body.Items[i].queryTxt
            });
          }
          jsonArr2.push({
              ticketNumber: ticketNumber,
              ticketArea: ticketArea,
              userId: userId,
              issueFaced: issueFaced,
              queryData: jsonArr
          });

          console.log ( "jsonArr2 " + JSON.stringify (jsonArr2))
          console.log ("issueFaced " +issueFaced)

          callback (lexResponses.close(sessionAttributes,"Fulfilled", message, null));
        } else {
          {
            console.log ("Error in the select query")
          }
        }
      })

  }




  }//end Fullfillment
}//end of function
