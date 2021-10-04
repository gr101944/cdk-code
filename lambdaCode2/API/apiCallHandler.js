module.exports.getKendra = function (qryText) {
    return "https://aj63gb3g89.execute-api.us-east-1.amazonaws.com/prod?qryText=" + qryText
}

module.exports.transferToWF = function (userName, orderDateTime, orderDate, orderTime, orderNumber, orderDetails,
                                    orderValue, customerPhone) {
    return "https://hva93camf8.execute-api.us-east-1.amazonaws.com/test/?userName=" + userName + "&orderDateTime=" +
      orderDateTime + "&orderDate=" + orderDate + "&orderTime="  + orderTime +  "&orderNumber="  + orderNumber + "&orderDetails="  + orderDetails + "&orderValue="  + orderValue +  "&customerPhone="  + customerPhone
}

module.exports.sendEmail = function (name, toAddress, fromAddress, templateName, ticketNumber, ticketArea) {
    return "https://zbdev9dazc.execute-api.us-east-1.amazonaws.com/prod?name=" + name + "&toAddress=" + toAddress + "&fromAddress=" + fromAddress + "&templateName=" + templateName + "&ticketNumber=" + ticketNumber + "&ticketArea=" + ticketArea
}
module.exports.insertQnA = function (userId, qnaId, dateEntered, queryTxt, responseTxt) {
    return "https://023s3w5kyi.execute-api.us-east-1.amazonaws.com/prod/?userId=" + userId + "&qnaId=" + qnaId + "&dateEntered=" + dateEntered + "&queryTxt=" + queryTxt + "&responseTxt=" + responseTxt
}
module.exports.getQnA = function (userId, qnaId) {
    return "https://yh3by6gb9a.execute-api.us-east-1.amazonaws.com/prod?userId=" + userId + "&qnaId=" + qnaId
}
module.exports.getTokenWF= function (userId, pwd) {
    return "http://ds-workflow.com/userapi/gatekeeper/signin?userid=" + userid + "&password=" + pwd
}
