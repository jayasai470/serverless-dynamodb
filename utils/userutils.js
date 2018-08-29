var AWS = require('aws-sdk');
var BPromise = require('bluebird');
var _ = require('lodash');

var config = require('../config');
var validationUtil = require('./validationutil');
var usersSchema = require('../models/users')

var IS_OFFLINE = config.IS_OFFLINE;
var dynamo;
if (IS_OFFLINE === 'true') {
    console.log('offline dynamodb');
  dynamo = new AWS.DynamoDB.DocumentClient({
    region: 'localhost',
    endpoint: 'http://localhost:8000'
  })
} else {
  dynamo = new AWS.DynamoDB.DocumentClient();
}

var TableName = config.dynamoDB.users_TABLE;

exports.finduserById = function (userId) {
    return new BPromise(function (resolve, reject) {
        try {
            var params = {
                TableName: TableName,
                Key: {
                    "userId": userId
                }
            }
            dynamo.get(params, function (err, res) {
                if (err) {
                    reject(err)
                }
                else {
                    resolve(res.Item)
                }
            })
        }
        catch (e) {
            reject(e)
        }
    })
}

exports.insertUser = function(user) {
    return new BPromise(function(resolve, reject) {
        try {
            validationUtil.validateUsersSchema(user);
            if(validData != 'valid') {
                reject(validData)
            } else {
                var params = {
                    TableName: TableName,
                    Item: user
                }
                dynamo.put(params, function(err, res) {
                    if (err) {
                        reject(err)
                    }
                    else {
                        resolve(res)
                    }
                })
            }
        }
        catch (e) {
            reject("invalid payLoad")
        }
    })
}

exports.findAllUsers = function(lastEvaluatedKey){
    return new BPromise(function(resolve, reject) {
        try {
            var params = {
                TableName: TableName,
                Limit: 100,
            }

            if(lastEvaluatedKey){
                params.ExclusiveStartKey = {
                    userId: lastEvaluatedKey
                }
            }

            dynamo.scan(params, function(err, res) {
                if (err) {
                    reject(err)
                }
                else {
                    resolve(res)
                }
            })
        }
        catch (e) {
            reject(e)
        }
    })
}

exports.findUserByEmail = function (email) {
    return new BPromise(function (resolve, reject) {
        try {
            var params = {
                TableName: TableName,
                FilterExpression : 'email = :email',
                ExpressionAttributeValues : {':email' : email}
            }
            dynamo.scan(params, function (err, res) {
                if (err) {
                    reject(err)
                }
                else {
                    resolve(res)
                }
            })
        }
        catch (e) {
            reject(e)
        }

    })
}

exports.findusersByEmailsList = function (emailsList) {
    return new BPromise(function (resolve, reject){
        try {
            var emailsObject = {};
            var index = 0;
            emailList.forEach(function(slaveCardId){
                index++;
                var emailkey = ":email"+index;
                emailsObject[slaveCardkey.toString()] = slaveCardId;
            })
    
            var params = {
                TableName: TableName,
                FilterExpression: "slaveCardId IN ("+Object.keys(emailsObject).toString()+ ")",
                ExpressionAttributeValues : emailsObject
            }
            dynamo.scan(params, function (err, scanResult){
                if(err) {
                    reject(err)
                } else {
                    resolve(scanResult)
                }
            })
        } catch (e) {
            reject(e)
        }
    })
}

exports.updateuser = function(userId, user) {
    return new BPromise(function(resolve, reject){
        try {
            var updateFields = {}
            Object.keys(user).forEach(function(userFields) {
                if(usersSchema.required.indexOf(userFields) >= 0){
                    updateFields[userFields] = {
                        Action: 'PUT',
                        Value: user[userFields]
                    }
                }
            })

            var params = {
                TableName: TableName,
                Key: {
                    "userId": userId
                },
                AttributeUpdates: updateFields,
                ReturnValues: 'UPDATED_NEW'
            }

            dynamo.update(params, function (err, success) {
                if (err) {
                    reject(err)
                } else {
                    console.log(success)
                    resolve(success)
                }
            })
        } catch (e) {
            reject(e)
        }
    })
}
