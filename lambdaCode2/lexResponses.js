'use strict';

module.exports.delegate = function(sessionAttributes, slots, message) {
  return {
    sessionAttributes,
    dialogAction: {
      type: 'Delegate',
      slots
    }
  };
};

module.exports.ElicitIntent = function(sessionAttributes, message) {
  return {
    sessionAttributes,
    dialogAction: {
      type: 'ElicitIntent',
      message
    }
  };
};


module.exports.elicitSlot = function(sessionAttributes, intentName, slots, slotToElicit, message, responseCard) {
  return {
    sessionAttributes,
    dialogAction: {
      type: 'ElicitSlot',
      intentName,
      slots,
      slotToElicit,
      message,
      responseCard
    }
  };
};

module.exports.close = function(sessionAttributes, fulfillmentState, message, responseCard) {
  return {
    sessionAttributes,
    dialogAction: {
      type: 'Close',
      fulfillmentState,
      message,
      responseCard
    }
  };
};

module.exports.confirmIntent = function(sessionAttributes, intentName, slots, message, responseCard) {
  return {
    sessionAttributes,
    dialogAction: {
      type: 'ConfirmIntent',
      intentName,
      slots,
      message,
      responseCard
    }
  };
};
