import { NextFunction, Request, RequestHandler, Response } from "express";
// import studentValidationSchema from "../student/student.validation";
import { StudentServices } from "../student/student.sevice";
import { userService } from "./user.service";
import sendResponse from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";
import catchasync from "../../utils/catchAsync";



const createStudent: RequestHandler = catchasync(async (req, res,next) => {
    try {
      const {password,student} = req.body;
      ///data validation using ZOD
  
    //   const zodParseData=studentValidationSchema.parse(student)
  
      const result = await userService.createStudentIntoDB(password, student);
  
  
      //send response
      
    //   res.status(200).json({
    //     success: true,
    //     message: 'student is created successfully',
    //     data: result,
    //   });

        sendResponse(res, {
            statusCode: StatusCodes.OK,
            success: true,
            message: 'student created successfully',
            data: result
        })

    } catch (err : any) {
        next(err)
        
    }
  });

  export const userController= {
    createStudent
  }