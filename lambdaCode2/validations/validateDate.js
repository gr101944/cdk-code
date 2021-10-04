'use strict';
var moment = require('moment-mini');

module.exports.validateDate = function (dateValue, offset) {
  console.log("dateValue " + dateValue)
  var orderDateTimeAdj = moment().add(offset, 'minutes');
  var orderTimeAdj = orderDateTimeAdj.toISOString().substring(11,19)
  var orderDateAdj = orderDateTimeAdj.toISOString().substring(0,10)
  console.log("orderTimeAdj " + orderTimeAdj)
  console.log("orderDateAdj " + orderDateAdj)


  var now = new Date();
  var dateValuenow = new Date();
  var dateValuenowTime = dateValuenow.toISOString().substring(11,19)
  var currDate = now.toISOString().substring(0,10)
  now.setHours(now.getHours() + offset)
  var currDate = now.toISOString().substring(0,10)
  console.log("currDate " + currDate)
  var currTime = now.toISOString().substring(11,19)
  console.log("currTime " + currTime)
  var dateValueInt = dateValue.substring(0,4) +dateValue.substring(5,7) + dateValue.substring(8,10)
  var currDateInt =  currDate.substring(0,4) +currDate.substring(5,7) + currDate.substring(8,10)
  var dateDiff = (currDateInt - dateValueInt)
  console.log("dateDiff " + dateDiff)

  //  LEX checks date in UTC, this causes a bug in the time difference period during the end of the day
  // if passed is yesterday but the UTC time + offset is beyond midnight, change the date passed to today
  var offsetIntTime = (24-offset) + ":00:00"

  console.log ("dateValuenowTime " + dateValuenowTime)
  console.log ("dateValue " + dateValue)
  console.log ("currDate " + currDate)
  console.log ("currTime " + currTime)
  console.log ("dateValueInt " + dateValueInt)
  console.log ("currDateInt " + currDateInt)
  console.log ("dateDiff " + dateDiff)
  console.log ("offsetIntTime " + offsetIntTime)

  if ((dateValuenowTime > offsetIntTime) && (dateDiff === 1)){
    console.log ("In NextDay ")
    return ("NextDay")
  } else
  if (dateValue < currDate){
    return("ERROR")
  } else if (dateValue === currDate) {
    return("Same Day Order")
  }else
  {
    return("OK")
  }
}
