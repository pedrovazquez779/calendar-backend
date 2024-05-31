const {isValid} = require('date-fns');

const isValidDate = (value) => {
    if (!value) {
        return false;
    }

    return isValid(value);
};

module.exports = {
    isValidDate
};