'use strict';
//Automated definition of constant
const handleQuery= require('./intentHandlers/handleQuery');
const handleGreeting = require('./intentHandlers/handleGreeting');
const handleTicket = require('./intentHandlers/handleTicket');
const handleOptions = require('./intentHandlers/handleOptions');
const handleCancel = require('./intentHandlers/handleCancel');
const handleWorkflow = require('./intentHandlers/handleWorkflow');
const handleContinue = require('./intentHandlers/handleContinue');


module.exports = function (sessionAttributes, intentRequest, slots, callback) {

    var intentName = intentRequest.currentIntent.name;
    console.log ("Intentname is  " + intentName)

    if (intentName === 'handleQuery'){
        return handleQuery(sessionAttributes, intentRequest, slots, callback)
    }
    else
    if (intentName === 'handleGreeting'){
        return handleGreeting(sessionAttributes, intentRequest, slots, callback)
    }
    else
    if (intentName === 'handleTicket'){
        return handleTicket(sessionAttributes, intentRequest, slots, callback)
    }
    else
    if (intentName === 'handleOptions'){
        return handleOptions(sessionAttributes, intentRequest, slots, callback)
    }
    else
    if (intentName === 'handleCancel'){
        return handleCancel(sessionAttributes, intentRequest, slots, callback)
    }
    else
    if (intentName === 'handleWorkflow'){
        return handleWorkflow(sessionAttributes, intentRequest, slots, callback)
    }
    else
    if (intentName === 'handleContinue'){
        return handleContinue(sessionAttributes, intentRequest, slots, callback)
    }

    throw new Error(`Intent with name ${intentName} not supported`);
 }
