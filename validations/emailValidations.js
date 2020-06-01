exports.emailValidation = {
  isValid(value) {
    return value.indexOf('@') > -1
      && value.split('@')[1].indexOf('.') > -1;
  }
}