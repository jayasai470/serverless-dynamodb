var Ajv = require('ajv')

var ajv = new Ajv({removeAdditional: 'all' });

var usersSchema = require('../models/users');

exports.validateUsersSchema = function (data) {
    if (!ajv.validate(usersSchema, data)) {
        return ajv.errors;
    } else {
        return "valid";
    }
}



