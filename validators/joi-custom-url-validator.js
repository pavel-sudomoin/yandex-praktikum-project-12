const validator = require('validator');

module.exports = (value, helpers) => {
  if (!validator.isURL(value)) {
    // eslint-disable-next-line no-useless-escape
    return helpers.message(`\"${helpers.state.path}\" must be a valid url`);
  }
  return value;
};