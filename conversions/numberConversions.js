module.exports = {
  round(decimalValue, places = 0) {
    const mult = parseInt("1".padEnd(1 + places, "0"))
    return Math.round((decimalValue + Number.EPSILON) * mult) / mult
  },
  trunc(decimalValue, places = Number.MAX_SAFE_INTEGER) {
    let stringValue = decimalValue.toString();
    let separatorPos = stringValue.indexOf(".");
    return parseFloat(stringValue.substring(0, (separatorPos + 1) + places));
  }
};

