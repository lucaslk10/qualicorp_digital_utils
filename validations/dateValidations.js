module.exports = {
  isValidBRFormat(data) {
    return new RegExp(/^\d{2}\/\d{2}\/\d{4}$/).test(data);
  },
  isValidEUAFormat(data) {
    return new RegExp(/([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/).test(data);
  },
  isValidRange(dataInicio, dataFim) {
    return parseInt(dataFim) > parseInt(dataInicio);
  }
};