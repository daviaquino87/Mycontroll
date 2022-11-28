export class ErrorPrivate extends Error {
  public readonly statusCode: number;
  public readonly privateError: boolean;

  constructor(message: string, statusCode: number, privateError: boolean) {
    super(message);
    this.statusCode = statusCode;
    this.privateError = privateError;
  }
}
