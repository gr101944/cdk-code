'use strict';


module.exports.scanTranscript = function (intentRequest) {

  if ((intentRequest.inputTranscript.toLowerCase().indexOf("order of a") >= 0) ||
     (intentRequest.inputTranscript.toLowerCase().indexOf("i want a") >= 0) ||
     (intentRequest.inputTranscript.toLowerCase().indexOf("give me a") >= 0))

      {
        console.log("before setting value to 1")
        intentRequest.currentIntent.slots.slotFour = 1
        SlotFourValue = intentRequest.currentIntent.slots.slotFour;
        console.log("after setting value to 1")
      }

  if ((intentRequest.inputTranscript.toLowerCase().indexOf("now") >= 0) ||
     (intentRequest.inputTranscript.toLowerCase().indexOf("as soon as possible") >= 0) ||
     (intentRequest.inputTranscript.toLowerCase().indexOf("asap") >= 0))

      {
        console.log("before setting time and date")
        var orderDateTimeAdj = moment().add(offset1, 'minutes');
        var orderTimeAdj = orderDateTimeAdj.toISOString().substring(11,19)
        var orderDateAdj = orderDateTimeAdj.toISOString().substring(0,10)
        intentRequest.currentIntent.slots.slotOne = orderDateAdj
        SlotOneValue = intentRequest.currentIntent.slots.slotOne;
        intentRequest.currentIntent.slots.slotTwo = orderTimeAdj
        SlotTwoValue = intentRequest.currentIntent.slots.slotTwo;
        console.log("after setting " + intentRequest.currentIntent.slots.slotOne)
        console.log("after setting " + intentRequest.currentIntent.slots.slotTwo)
      }

}
