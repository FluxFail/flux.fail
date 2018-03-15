const tv4 = require('tv4');
const { isEmail, isUUID } = require('validator');
const schemaPasswordless = require('../schema/passwordless.json');
const schemaExchange = require('../schema/exchange.json');

exports.initialize = () => {
  tv4.addFormat({
    email: (value) => {
      if (isEmail(value)) {
        return null;
      }
      return 'invalid email address';
    },
    uuid: (value) => {
      if (isUUID(value, 4)) {
        return null;
      }
      return 'invalid UUID';
    },
  });
};

function validate(schema, payload) {
  return new Promise((resolve, reject) => {
    const result = tv4.validateMultiple(payload, schema);
    if (result.valid) {
      resolve(true);
      return;
    }
    let errorMessage = 'Invalid payload';
    if (result.errors.length === 1) {
      errorMessage = result.errors[0].message;
    }
    const err = new Error(errorMessage);
    err.httpCode = 422;
    err.validationErrors = result.errors;
    reject(err);
  });
}

exports.validatePasswordless = payload => validate(schemaPasswordless, payload);
exports.validateExchange = payload => validate(schemaExchange, payload);
