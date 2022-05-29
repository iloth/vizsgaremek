export default class HttpException extends Error {
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.message = message;
  }

  status: number;
  message: string;
}
