import  { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';


const globalErrorHandler=  (err: any, req: Request, res: Response, next: NextFunction) => {
    const statusCode= err.statusCode || 500;
    let message = err.message ||'something went wrong !'
  
    return res.status(statusCode).json({
      success:false,
      message,
      error: err
    })
  }

  export default globalErrorHandler