const { handle404 } = require("./handle404");
const { handleError } = require("./handleError");
const { validateAuth } = require("./validateAuth");

module.exports = {
  handle404,
  handleError,
  validateAuth
}