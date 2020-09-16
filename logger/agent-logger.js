const logger = require("./logger");
const { v1 } = require("uuid");
const { performance, PerformanceObserver } = require("perf_hooks");

async function generateErrorLog(error, req, res) {
    let duration = 0;
    const obs = new PerformanceObserver((items) => {
        duration = items.getEntries()[0].duration;
        performance.clearMarks();
    });
    obs.observe({ entryTypes: ["measure"] });

    let objLog = {};

    const oldWrite = res.write;
    const oldEnd = res.end;
    const chunks = [];

    res.write = (...restArgs) => {
        chunks.push(Buffer.from(restArgs[0]));
        oldWrite.apply(res, restArgs);
    };

    res.end = (...restArgs) => {
        if (restArgs[0]) {
            chunks.push(Buffer.from(restArgs[0]));
        }
        const body = Buffer.concat(chunks).toString("utf8");

        if (error.isAxiosError) {
            objLog = {
                status: error.response.data.status || 500,
                message: error.response.data.message,
                fromIP:
                    req.headers["x-forwarded-for"] ||
                    req.connection.remoteAddress,
                method: error.response.config.method,
                originalUri: req.originalUrl,
                uri: error.response.config.url,
                requestData: error.config.data,
                responseData: body,
                referer: req.headers.referer || "",
                ua: req.headers["user-agent"],
                error: error.response.data.message,
                external: true,
                url: req.headers.host,
            };
        } else {
            objLog = {
                status: res.statusCode || "500",
                message: error.message,
                fromIP:
                    req.headers["x-forwarded-for"] ||
                    req.connection.remoteAddress,
                method: req.method,
                originalUri: req.originalUrl,
                uri: req.url,
                requestData: req.body,
                responseData: body,
                referer: req.headers.referer || "",
                ua: req.headers["user-agent"],
                error: error.stack,
                external: false,
                url: req.headers.host,
            };
        }

        const msgLog = objLog.message;
        delete objLog.message;

        const reqId = res.getHeader("x-request-id");
        performance.measure("start to now", reqId);

        objLog.duration = duration;

        logger.error(msgLog, objLog);
        oldEnd.apply(res, restArgs);
    };
}

async function generateLogInfo(req, res, next) {
    let duration = 0;
    const obs = new PerformanceObserver((items) => {
        duration = items.getEntries()[0].duration;
        performance.clearMarks();
    });
    obs.observe({ entryTypes: ["measure"] });

    const resId = v1();
    performance.measure("Start to Now");
    performance.mark(resId);
    res.setHeader("x-request-id", resId);

    let objLog = {};
    const oldWrite = res.write;
    const oldEnd = res.end;

    const chunks = [];

    res.write = (...restArgs) => {
        chunks.push(Buffer.from(restArgs[0]));
        oldWrite.apply(res, restArgs);
    };

    res.end = (...restArgs) => {
        if (restArgs[0]) {
            chunks.push(Buffer.from(restArgs[0]));
        }
        const body = Buffer.concat(chunks).toString("utf8");

        if (res.statusCode >= 200 && res.statusCode <= 299) {
            objLog = {
                status: res.statusCode || "500",
                fromIP:
                    req.headers["x-forwarded-for"] ||
                    req.connection.remoteAddress,
                method: req.method,
                originalUri: req.originalUrl,
                uri: req.url,
                requestData: req.body,
                responseData: body,
                referer: req.headers.referer || "",
                ua: req.headers["user-agent"],
                url: req.headers.host,
            };

            const reqId = res.getHeader("x-request-id");
            performance.measure("start to now", reqId);

            objLog.duration = duration;

            logger.info("info", objLog);
        }

        oldEnd.apply(res, restArgs);
    };

    next();
}

module.exports = { generateErrorLog, generateLogInfo };
