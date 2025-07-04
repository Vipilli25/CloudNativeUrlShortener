
const AWS = require('aws-sdk');

AWS.config.update({
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
})

const dynamoDB = new AWS.DynamoDB.DocumentClient();
const TableName = process.env.DYNAMODB_TABLE;
console.log('Loaded DynamoDB Table Name:', TableName);

module.exports = { dynamoDB, TableName };