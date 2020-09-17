const appRoot = require("app-root-path");
const winston = require("winston");
const ElasticsearchTransport = require("winston-elasticsearch");
const os = require("os");
const { Client } = require("@elastic/elasticsearch");

class myLogger {
    constructor() {
        this.client = new Client({
            node: process.env.LOG_ES_HOST,
            maxRetries: 5,
            requestTimeout: 60000,
            sniffOnStart: true,
        });

        this.options = {
            file: {
                level: "warn",
                filename: `${appRoot}/logs/app.log`,
                handleExceptions: true,
                json: true,
                maxsize: 5242880, // 5MB
                maxFiles: 5,
                colorize: false,
            },
        };

        this.esTransportOpts = {
            level: "info",
            index: "logs",
            transformer: this.transformer,
            client: this.client,
        };

        this.logger = "";
        this.esTransport = "";
    }

    setupLogger() {
        this.esTransport = new ElasticsearchTransport(this.esTransportOpts);

        this.logger = winston.createLogger({
            transports: [
                new winston.transports.File(this.options.file),
                new winston.transports.Console(this.options.console),
                this.esTransport,
            ],
            exitOnError: false, // do not exit on handled exceptions
        });

        // Compulsory error handling
        this.logger.on("error", (error) => {
            console.error("Error caught 1 ", error);
        });
        this.esTransport.on("warning", (error) => {
            console.error("Error caught 2 ", error);
        });
    }

    /** 
    @param {Object} logData
    @param {Object} logData.message - the log message
    @param {Object} logData.level - the log level
    @param {Object} logData.meta - the log meta data (JSON object)
    @returns {Object} transformed message
    */
    transformer(logData) {
        const transformed = {};
        transformed["@timestamp"] = logData.timestamp
            ? logData.timestamp
            : new Date().toISOString();
        transformed.message = logData.message;
        transformed.severity = logData.level;
        transformed.projeto = process.env.LOG_PROJETO;
        transformed.microservice = process.env.LOG_APP;
        transformed.fields = logData.meta;
        transformed.fields.host = os.hostname();

        if (logData.meta["transaction.id"])
            transformed.transaction = { id: logData.meta["transaction.id"] };
        if (logData.meta["trace.id"])
            transformed.trace = { id: logData.meta["trace.id"] };
        if (logData.meta["span.id"])
            transformed.span = { id: logData.meta["span.id"] };

        return transformed;
    }
}

const loggerInstance = new myLogger();

module.exports = {
    setupLogger: loggerInstance.setupLogger.bind(loggerInstance),
    myLogger: loggerInstance,
};
