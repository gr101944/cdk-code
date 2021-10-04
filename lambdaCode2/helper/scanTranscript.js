'use strict';
var main = "main";

module.exports.scanTranscript = function (intentRequest) {
      if ((intentRequest.inputTranscript.toLowerCase().indexOf("order of a") >= 0) ||
         (intentRequest.inputTranscript.toLowerCase().indexOf("i want a") >= 0) ||
         (intentRequest.inputTranscript.toLowerCase().indexOf("give me a") >= 0))

          {
          //  console.log("before setting value to 1")
            // intentRequest.currentIntent.slots.slotFour = 1
            // SlotFourValue = intentRequest.currentIntent.slots.slotFour;
          //  console.log("after setting value to 1")
          }

      if ((intentRequest.inputTranscript.toLowerCase().indexOf("now") >= 0) ||
         (intentRequest.inputTranscript.toLowerCase().indexOf("as soon as possible") >= 0) ||
         (intentRequest.inputTranscript.toLowerCase().indexOf("asap") >= 0))

          {

          }

    }
