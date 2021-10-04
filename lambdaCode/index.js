const AWS = require("aws-sdk");

const docClient = new AWS.DynamoDB.DocumentClient({region: 'us-east-1'});

exports.handler = function (e, ctx, callback)

{
 
    console.log("event " + JSON.stringify(e));
    var userId = e.userId;
    var qnaId = e.qnaId;
    var tableName = "qnaMaster";
    
    var params = {
        TableName: tableName,
        KeyConditionExpression: "userId = :userId and qnaId > :qnaId",
    
        ExpressionAttributeValues: {
            ":userId": userId,
            ":qnaId": qnaId
        }
    };



    docClient.query(params, function(err, data) {
        if (err) {
           callback(err, null);
        } else {
            console.log ("data is " + JSON.stringify(data));
            callback(null, data);
            
        }
    });
    

};