const mongoose = require('mongoose');

const { Types: { ObjectId } } = mongoose;

function isObjectIdValid(id) {
  if (ObjectId.isValid(id) && (new ObjectId(id)).toString() === id) return true;
  return false;
}

module.exports = isObjectIdValid;
