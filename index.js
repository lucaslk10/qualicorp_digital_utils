const setupEnvironment = require("./config");
const responseStructs = require("./responseStructs");
const AppError = require("./AppError");
const middlewares = require("./middlewares");
const validations = require("./validations");

module.exports = {
  setupEnvironment: setupEnvironment,
  responseStructs: responseStructs,
  AppError: AppError,
  middlewares: middlewares,
  validations: validations
}