const hashsConversions = require("./hashsConversions");
const inputConversions = require("./inputConversions");
const dateConversions = require("./dateConversions");
const numberConversions = require("./numberConversions");
const stringConversions = require("./stringConversions");

module.exports = {
  hashs: hashsConversions,
  inputs: inputConversions,
  date: dateConversions,
  number: numberConversions,
  string: stringConversions
}
