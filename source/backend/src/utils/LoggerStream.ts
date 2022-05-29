import logger from "./logger";

export default class LoggerStream {
  write(message: string) {
      logger.info(message);
  }
}