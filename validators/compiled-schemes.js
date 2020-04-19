const Ajv = require('ajv');
const { isEmail } = require('validator');

const cardSheme = require('../json-schemes/card');
const userSheme = require('../json-schemes/user');
const updateUserInfoSheme = require('../json-schemes/update-user-info');
const updateUserAvatarSheme = require('../json-schemes/update-user-avatar');
const loginSheme = require('../json-schemes/login');
const idSheme = require('../json-schemes/id');

const ajv = new Ajv({
  schemas:
    [
      cardSheme,
      userSheme,
      updateUserInfoSheme,
      updateUserAvatarSheme,
      loginSheme,
      idSheme,
    ],
  format: 'full',
}).addFormat('email', isEmail);

module.exports.cardValidate = ajv.getSchema('http://sudomoin-pavel-project-mesto.tk/schemas/card.json');
module.exports.userValidate = ajv.getSchema('http://sudomoin-pavel-project-mesto.tk/schemas/user.json');
module.exports.updateUserInfoValidate = ajv.getSchema('http://sudomoin-pavel-project-mesto.tk/schemas/update-user-info.json');
module.exports.updateUserAvatarValidate = ajv.getSchema('http://sudomoin-pavel-project-mesto.tk/schemas/update-user-avatar.json');
module.exports.loginValidate = ajv.getSchema('http://sudomoin-pavel-project-mesto.tk/schemas/login.json');
module.exports.idValidate = ajv.getSchema('http://sudomoin-pavel-project-mesto.tk/schemas/id.json');
module.exports.ajv = ajv;
