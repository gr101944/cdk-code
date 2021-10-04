'use strict';

var main = "main";
var ticket = "ticket";
var problem = "problem";


module.exports.buildOptions = function (param) {
  console.log ("in buildOptions")
  if (param === main) {
    return [
      { text: 'Open Ticket', value: 'open a ticket' },
      { text: 'Talk to HR Support', value: 'i want to talk to hr support' },
      { text: 'Continue Search', value: 'I want to continue' },
      { text: 'Done', value: 'i am done' }

    ]}
  else
  if (param === ticket) {
      return [
       { text: 'Benefits', value: '100' },
       { text: 'Covid', value: '200' },
       { text: 'Training', value: '300' },
       { text: 'Appraisal', value: '400' },
       { text: 'Cancel', value: '500' }
      ]
    }
  else
  if (param === problem) {
      return [
       { text: 'Results unuseful', value: '100' },
       { text: 'No results', value: '200' },
       { text: 'Timed out', value: '300' },
       { text: 'Need more info', value: '400' },
       { text: 'Cancel', value: '500' }
      ]
    }

}
