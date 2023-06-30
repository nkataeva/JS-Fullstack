import { Request, Response, NextFunction } from 'express';
import { createLogger, transports, format } from "winston";

export const logger = createLogger({
    transports: [
        new transports.Console({
            format: format.combine(format.timestamp(), format.simple())
        }),
        new transports.File({
            filename: 'error.log',
            level: 'error',
            format: format.combine(format.timestamp(), format.json())
        })
    ]
});

export function loggerMiddleware(req: Request, res: Response, next: NextFunction) {
    // Логика логгера...
}