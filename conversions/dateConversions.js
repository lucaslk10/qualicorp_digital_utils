const moment = require("moment");

module.exports = {
  formatBrasil(date) {
    return moment(date).format("DD/MM/YYYY");
  },
  clear(data, separator = "/") {
    return data.split(separator).join("");
  },
  reverse(data, separator = "/") {
    return data.split(separator).reverse().join(separator);
  },
  clearAndReverse(data, separator = "/") {
    return data.split(separator).reverse().join("");
  }
};