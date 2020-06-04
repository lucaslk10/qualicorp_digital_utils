const moment = require("moment");

module.exports = {
  formatBrasil(date) {
    return moment(date).format("DD/MM/YYYY");
  }
};