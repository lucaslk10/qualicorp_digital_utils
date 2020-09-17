const agentLogger = require("./agent-logger");
const { setupLogger, myLogger } = require("./logger");

module.exports = {
  agentLogger: agentLogger,
  setupLogger,
  logger: myLogger,
}