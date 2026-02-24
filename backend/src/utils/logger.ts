import pino from "pino";

const logger = pino({
  level: process.env.LOG_LEVEL || "info",
  transport: {
    targets: [
      {
        target: "pino-pretty",
        options: {
          colorize: true,
          translateTime: "SYS:standard",
          ignore: "pid,hostname",
          destination: 1
        },
        level: "info"
      },
      {
        target: "pino-roll",
        options: {
          file: "./logs/app.log",
          size: "10M",
          limit: {
            count: 2
          }
        },
        level: "info"
      }
    ]
  }
});

export default logger;