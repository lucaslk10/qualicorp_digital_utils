const { config } = require("dotenv");
const { join } = require("path");
const path = require("path");

const setupEnvironment = function (dirname = process.cwd()) {
  global.configPath = path.resolve(dirname);
  const env = process.env.NODE_ENV || "dev";
  const configPath = join(global.configPath, `.env.${env}`);

  config({
    path: configPath
  });
};

module.exports = setupEnvironment;