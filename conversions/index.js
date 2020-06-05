const hashsConversions = require("./hashsConversions");
const inputConversions = require("./inputConversions");
const dateConversions = require("./dateConversions");
const numberConversions = require("./numberConversions");

module.exports = {
  hashs: hashsConversions,
  inputs: inputConversions,
  date: dateConversions,
  number: numberConversions
}
