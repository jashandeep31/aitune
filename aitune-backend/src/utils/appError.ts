export class AppError extends Error {
  statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);
    // Set the prototype explicitly because TypeScript sometimes has trouble with this when using class inheritance
    Object.setPrototypeOf(this, AppError.prototype);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}
