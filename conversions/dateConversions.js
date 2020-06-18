const moment = require("moment");

module.exports = {
  formatBrasil(date) {
    return moment(date).format("DD/MM/YYYY");
  },
  formatEUA(value) {
    let date = (typeof value === "string") ? new Date(value) : value;

    return moment(date).format("YYYY-MM-DD");
  },
  formatEUAdateTime(value) {
    let date = (typeof value === "string") ? new Date(value) : value;

    return moment(date).format("YYYY-MM-DD HH:mm:SS");
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