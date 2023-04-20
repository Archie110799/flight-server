export default class HttpExceptionData extends Error {
    statusCode?: number;
    status?: number;
    message: string;
    data: Array<unknown> = [];
  
    constructor(statusCode: number, message: string, data: Array<unknown> = []) {
      super(message);
    
      this.statusCode = statusCode;
      this.message = message;
      this.data = data;
    }
  }
  