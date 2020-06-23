const moment = require("moment");
const AppError = require("../exceptions/AppError");

module.exports = {
  formatBrasil(date) {
    return moment(date).format("DD/MM/YYYY");
  },
  formatEUA(value) {
    if (!((typeof value === "string") || (typeof value === "number") || (typeof value.getMonth === "function"))) {
      throw new AppError("Formato de Data inválido.")
    }

    return moment(value).format("YYYY-MM-DD");
  },
  formatEUAdateTime(value) {
    if (!((typeof value === "string") || (typeof value === "number") || (typeof value.getMonth === "function"))) {
      throw new AppError("Formato de Data inválido.")
    }

    return moment(value).format("YYYY-MM-DD HH:mm:SS");
  },
  formatTimestamp(value) {
    if (!((typeof value === "string") || (typeof value === "number") || (typeof value.getMonth === "function"))) {
      throw new AppError("Formato de Data inválido.")
    }

    return moment(value).toDate().getTime();
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