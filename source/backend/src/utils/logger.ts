import winston from 'winston';
import config from 'config';
import { FileTransportOptions } from 'winston/lib/winston/transports';
import { Format } from 'logform';

const file: FileTransportOptions = {
  level: config.get('log.winston.file.level'),
  filename: config.get('log.winston.file.filename'),
  format: winston.format[config.get<string>('log.winston.file.format') as keyof typeof Format](),
};
const console: FileTransportOptions = {
    level: config.get('log.winston.console.level'),
    format: winston.format[config.get('log.winston.console.format') as keyof typeof Format](),
};


export default winston.createLogger({
  transports: [
    new winston.transports.File(file),
    new winston.transports.Console(console)
  ],
  exitOnError: false
});