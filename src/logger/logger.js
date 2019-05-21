import winston from 'winston';

const { format } = winston;
const { combine, timestamp, label, printf } = format;
const loggerFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
});
const logger = winston.createLogger({
    level: 'info',
    format: combine(
        label({ label: 'app-name' }),
        timestamp(),
        winston.format.colorize(),
        loggerFormat
    ),
    defaultMeta: { service: 'service-name' },
    transports: [
        //
        // - Write to all logs with level `info` and below to `combined.log` 
        // - Write all logs error (and below) to `error.log`.
        //
        // new winston.transports.File({ filename: 'error.log', level: 'error' }),
        // new winston.transports.File({ filename: 'combined.log' })
        new winston.transports.Console()
    ]
});


//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
// 
// if (process.env.NODE_ENV !== 'production') {
//     logger.add(new winston.transports.Console({
//         format: winston.format.simple()
//     }));
// }

export default logger;