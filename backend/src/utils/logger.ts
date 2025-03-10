import winston from 'winston';

class Logger {
    private logger: any;

    constructor() {
        this.logger = winston.createLogger({
            level: 'info',
            format: winston.format.json(),
            transports: [
                new winston.transports.Console(),
                new winston.transports.File({ filename: 'logs/contact.log' }),
            ],
        });
    }

    public logInfo(className: string, methodName: string, message: string) {
        const timestamp = new Date().toISOString();
        this.logger.info(`${timestamp} ${className}.${methodName}: ${message}`);
    }

    public logError(className: string, methodName: string, message: string, error: any) {
        const timestamp = new Date().toISOString();
        this.logger.error(`${timestamp} ${className}.${methodName}: ${message}`, error);
    }
}

export const logger = new Logger();