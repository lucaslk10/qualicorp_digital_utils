module.exports = {
  getOnlyNumbers(str) {
    return str.replace(/[^\d]+/g, '')
  },
  hasFileExtension(fileName) {
    const re = /(?:\.([^.]+))?$/;
    const ext = re.exec(fileName)[1];

    return (!!ext);
  },
  getFileExtension(fileName) {
    const re = /(?:\.([^.]+))?$/;
    const ext = re.exec(fileName)[1];

    return (ext) ? ext : "";
  },
  normalize(value) {
    if (typeof value !== "string") {
      throw new Error("value is not a string")
    }

    return value.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
  }
}