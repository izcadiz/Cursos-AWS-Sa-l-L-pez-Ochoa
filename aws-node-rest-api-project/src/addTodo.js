"use strict";

const { v4 } = require("uuid")
const AWS = require("aws-sdk")
const middy = require("@middy/core")
const httpJsonBodyParse = require("@middy/http-json-body-parser")

const addTodo = async (event) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient()

  const { todo } = event.body;
  const createdAt = new Date();
  const id = v4();


  const newTodo= {
    id,
    todo,
    createdAt,
    completed: false
  }

  await dynamodb.put({
    TableName: "TodoTable",
    Item: newTodo
    }).promise()

  return {
    statusCode: 200,
    body: JSON.stringify(newTodo),
  };
};

module.exports = {
    handler: middy(addTodo).use(httpJsonBodyParse())
}