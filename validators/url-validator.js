function urlValidator(url) {
  const urlRegExp = /^(https?:\/\/)(((25[0-5]|2[0-4][0-9]|1?[0-9]?[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1?[0-9]?[0-9])|(www\.)?(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9])\.)+[a-zA-Z]{2,6})(:\d{2,5})?(\/[a-zA-Z0-9]([a-zA-Z0-9\-/.]*[a-zA-Z0-9])?#?)?\/?$/;
  return urlRegExp.test(url);
}

module.exports = urlValidator;
