const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateProfileInput(data) {
  let errors = {};

  data.firstname = !isEmpty(data.firstname) ? data.firstname : '';
  data.gender = !isEmpty(data.gender) ? data.gender : '';
  data.address = !isEmpty(data.address) ? data.address : '';

  if (!Validator.isLength(data.firstname, { min: 2, max: 40 })) {
    errors.firstname = 'Handle needs to between 2 and 4 characters';
  }

  if (Validator.isEmpty(data.firstname)) {
    errors.firstname = 'Firstname is required';
  }

  if (Validator.isEmpty(data.gender)) {
    errors.gender = 'Gender field is required';
  }

  if (Validator.isEmpty(data.address)) {
    errors.address = 'Address field is required';
  }


  return {
    errors,
    isValid: isEmpty(errors)
  };
};
