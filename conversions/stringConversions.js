module.exports = {
  getOnlyNumbers(str) {
    return str.replace(/[^\d]+/g, '')
  }
}