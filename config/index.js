const { config } = require("dotenv");
const { join } = require("path");
const path = require("path");

exports.setupEnvironment = function () {
  global.appRoot = path.resolve(__dirname);
  const env = process.env.NODE_ENV || "dev";
  const configPath = join(global.appRoot, `.env.${env}`);

  config({
    path: configPath
  });
};
