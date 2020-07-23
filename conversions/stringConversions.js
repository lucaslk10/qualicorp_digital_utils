module.exports = {
  getOnlyNumbers(str) {
    return str.replace(/[^\d]+/g, '')
  },
  hasFileExtension(fileName) {
    const re = /(?:\.([^.]+))?$/;
    const ext = re.exec(fileName)[1];

    return (!!ext);
  }
}