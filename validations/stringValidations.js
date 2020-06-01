module.exports = {
  onlyLetters(value) {
    return value.match(/^[a-zA-Z]+$/)
  },
  onlyNumbers(value) {
    return value.match(/^[0-9]+$/)
  }
}