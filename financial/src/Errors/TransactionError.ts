export class TransactionError extends Error {
    constructor(message:string) {
      super(message);
      this.name = "TransactionError";
    }
  }