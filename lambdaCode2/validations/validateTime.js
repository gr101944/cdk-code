'use strict';


module.exports.validateTime = function (dateValue, timeValue,offset, timeDiff) {

  var now = new Date();
  var adjTimeDiff = parseInt(timeDiff)-5 // 5 min for execution of lambda -  max

  now.setHours(now.getHours() + offset)

  var currDate = now.toISOString().substring(0,10)
  var currTime = now.toISOString().substring(11,19)
  console.log ("dateValue " + dateValue)
  console.log ("currDate " + currDate)
  console.log ("currTime " + currTime)
  console.log ("timeValue " + timeValue)

  var currTimeHH = currTime.substring(0,2)
  var currTimeMM = currTime.substring(3,5)
  var currTimeInMinutes = (parseInt(currTimeHH) * 60 + parseInt(currTimeMM))
  var timeHH = timeValue.substring(0,2)
  var timeMM = timeValue.substring(3,5)
  var timeInMinutes = (parseInt(timeHH) * 60 + parseInt(timeMM))
  var timeDiffMin = timeInMinutes - currTimeInMinutes
  console.log ("timeInMinutes " + timeInMinutes)
    console.log ("currTimeInMinutes " + currTimeInMinutes)
    console.log ("timeDiffMin " + timeDiffMin)
    console.log ("adjTimeDiff " + adjTimeDiff)

  if ((dateValue > currDate))
    {
      //adding min of 24 hours
      timeDiffMin = timeDiffMin + 24*60
      console.log ("timeDiffMin in if " + timeDiffMin)
    }
  //var timeDiffMin = timeInMinutes - currTimeInMinutes
  console.log ("timeDiffMin " + timeDiffMin)
  if (timeDiffMin >= adjTimeDiff) {
    console.log ("timeHH " + timeHH)
    console.log ("timeMM " + timeMM)
    console.log ("timeInMinutes " + timeInMinutes)
    return("OK")
  }else
  {
    return("ERROR")
  }
}
