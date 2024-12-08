class CustomError extends Error {
    statusCode: number;
    message: string;
  
    constructor(statusCode: number, message: string) {
      super(message);
  
      this.statusCode = statusCode;
      this.message = message;
      Object.setPrototypeOf(this, CustomError.prototype); 
    }
  }
  
  export const errorHandler = (statusCode: number, message: string): CustomError => {
    return new CustomError(statusCode, message);
};

export default CustomError;