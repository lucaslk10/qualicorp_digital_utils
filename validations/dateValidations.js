module.exports = {
  isValidFormat(data) {
    return new RegExp(/^\d{2}\/\d{2}\/\d{4}$/).test(data);
  },
  isValidRange(dataInicio, dataFim) {
    return parseInt(dataFim) > parseInt(dataInicio);
  }
};