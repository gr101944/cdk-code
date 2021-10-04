'use strict';

var lexResponses = require('../lexResponses');
var needle = require('needle');

var changeToTitleCase = require('../helper/changeToTitleCase');
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
var message;
const minRandom = 123456789;
const maxRandom = 987659789;



module.exports = function (sessionAttributes, intentRequest, slots, callback) {
  intentRequest.sessionAttributes= intentRequest.sessionAttributes || {};

  currIntentName = intentRequest.currentIntent.name;
  console.log (currIntentName);
  console.log (JSON.stringify(intentRequest));
  const source = intentRequest.invocationSource;
  const outputDialogMode = intentRequest.outputDialogMode;
  console.log (source);
  if  (source === "DialogCodeHook"){
    console.log ("In DialogCodeHook")

  }//End of DialogCodeHook

  if (source === "FulfillmentCodeHook") {
    console.log ("In FulfillmentCodeHook")

    var qryText = intentRequest.inputTranscript;
    var urlKendra = apiCallHandler.getKendra(qryText );
    console.log ("urlKendra " + urlKendra);
    var type;
    var maxItems = 3;
    var voiceMessage = "";
    var docExcerpt = "";
    var scoreAttributes = "";
    var docExcerptQnA = "";
    var docExcerptQnASaved = "";
    var contentOut = "";
    var srchResult = "";
    var docTitle = "";
    var faqPresent = "n";
    var scoreConfidence = "";
    var savedScoreConfidence = "LOW";
    var dashes = "------------------------------------------------------";
    var newLine = "\n";
    needle.get(urlKendra, function(error, response) {
      if (!error && response.statusCode == 200){
        console.log(response.body);
        var items = response.body.ResultItems;
        var len = items.length;
        console.log("length " + len)
        for (var j = 0; j< len; j++){
          type = items[j].Type
          console.log("type " + type)
          if (type === "QUESTION_ANSWER"){
            faqPresent = "y";
            docExcerptQnA = items[j].DocumentExcerpt.Text;
            docExcerptQnASaved = docExcerptQnA;
            docExcerptQnA = JSON.stringify(docExcerptQnA);
            scoreAttributes = JSON.stringify(items[j].ScoreAttributes);
            console.log ("scoreAttributes QnA" + scoreAttributes)
            docExcerptQnA = "<h3>From FAQ: </h3>"  + docExcerptQnA + "<br>" + items[j].DocumentURI + "<br>" + dashes + "<br> <br>"
            console.log ("docExcerptQnA " + docExcerptQnA)
          }

        }

        for (var i = 0; i< maxItems; i++){
          type = items[i].Type
          console.log("type " + type)
          docExcerpt =  items[i].DocumentExcerpt.Text;
          docExcerpt =  docExcerpt.replace(/[\n\t]/g, ' ');
          docExcerpt = JSON.stringify(docExcerpt);
          console.log("docExcerpt " + docExcerpt)
          console.log("docExcerpt replaced" + docExcerpt.replace(/[\n\t]/g, ''))
          if (type != "QUESTION_ANSWER"){
            docTitle = items[i].DocumentTitle.Text
            console.log (docTitle)
            scoreConfidence = (items[i].ScoreAttributes.ScoreConfidence);
            if (scoreConfidence != "LOW"){
              savedScoreConfidence = scoreConfidence
            }
            srchResult =  srchResult + dashes + "<br>" + docExcerpt + "<br>" + "Link: " + "<a href =" + items[i].DocumentURI  + " target=" + '"' + "_blank" + '"' + ">" + docTitle + "</a>" +  "<br>" +  "<i> <small>" + "Search Confidence: "  + changeToTitleCase.toTitleCase(scoreConfidence) + " </small> </i> <br>"
            console.log (srchResult)
            srchResult = srchResult.toString()


            console.log ("scoreAttributes non QnA" + scoreAttributes)
          }
        }
        if (savedScoreConfidence === "LOW"){
          contentOut = "Sorry no matches found...you can ask for more options..."
        } else {
          contentOut = "<h2> Here are the results:  </h2>"  + "<br> <br>" +  docExcerptQnA + "<h3> From websites / documents:</h3>" + srchResult
        }
        if (outputDialogMode != "Voice"){
           message = {
            contentType: 'CustomPayload',
            content: contentOut
          }

        } else {
          console.log ("Processing Voice ")

          console.log ("faqPresent " + faqPresent)
          console.log ("docExcerptQnA " + docExcerptQnASaved)

          if (faqPresent === "y"){
            voiceMessage = "<speak>" + docExcerptQnASaved + "</speak>"
             message = {
              contentType: 'SSML',
              content: voiceMessage
            }
          } else {
            intentRequest.outputDialogMode = "Text"
            console.log ("intentRequest.outputDialogMode " + intentRequest.outputDialogMode)
            console.log ("contentOut " + contentOut)
             message = {
              contentType: 'PlainText',
              content: contentOut
            }
          }
        }
      //  var qryText = intentRequest.inputTranscript;
      var userId = "Rajesh Ghosh"
      var rnd = random.getRandomInt(minRandom,maxRandom);

      var responseTxt  = "TBD";

      var date = new Date();
      var dd = String(date.getDate()).padStart(2, '0');
      var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
      var yyyy = date.getFullYear();
      var todayDate = yyyy + "-" + mm + "-" + dd;
      //var qnaId = yyyy + mm + dd + rnd
      var ZERO_HOUR = 0; /* ms */
    //  var ONE_HOUR = 60 * 60 * 1000; /* ms */
      var qnaId =  ((new Date) - ZERO_HOUR)
    //  var y =  ((new Date) - ONE_HOUR)
    //console.log ((x-y))
      //
      // var qnaId = ( date.getFullYear() + ("0" + (date.getMonth() + 1)).slice(-2) + ("0" + date.getDate()).slice(-2) + ("0" + date.getHours() ).slice(-2) + ("0" + date.getMinutes()).slice(-2) + ("0" + date.getSeconds()).slice(-2) );



    //  module.exports.insertQnA = function (userId, qnaId, dateEntered, queryTxt, responseTxt) {
      var urlInsertDB = apiCallHandler.insertQnA(userId, qnaId, todayDate,qryText, responseTxt );
      needle.get(urlInsertDB, function(error, response) {
        if (!error && response.statusCode == 200){
          console.log(response.body);
          callback (lexResponses.close(sessionAttributes,"Fulfilled", message, null));
        } else {
          {
            console.log ("Error in the insert query")
          }
        }
      })


      }
    });
    // options = bo.buildOptions("main");

    // var title = "Title";
    // var subtitle = " ";
    // var imageOption = "someURL.PNG";
    // responseCard = brc.buildResponseCard(title,subtitle,options,null);
    // console.log("responseCard " + JSON.stringify(responseCard));

  }//end Fullfillment
}//end of function
