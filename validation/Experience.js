const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateExperienceInput(data) {
    let errors = {};

    data.title = !isEmpty(data.title) ? data.title : '';
    data.location = !isEmpty(data.location) ? data.location : '';

    if (Validator.isEmpty(data.title)) {
        errors.title = 'Title field is required';
    }

    if (Validator.isEmpty(data.location)) {
        errors.location = 'Location field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};
