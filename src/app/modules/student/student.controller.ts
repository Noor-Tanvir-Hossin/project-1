import { NextFunction, Request, RequestHandler, Response } from 'express';
import { StudentServices } from './student.sevice';
// import studentValidationSchema from './student.validation';
// import { error } from 'console';
import sendResponse from '../../utils/sendResponse';
import { StatusCodes } from 'http-status-codes';
import catchasync from '../../utils/catchAsync';





const getAllStudent : RequestHandler = catchasync(async(req, res, next) =>{
    
  
      const result= await StudentServices.getALLStudentFromDB()
      sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'students retrived successfully',
        data: result
    });
  
})

const getSingleStudent : RequestHandler= catchasync(async (req, res, next) =>{
  
    const { studentId }= req.params;
    const result = await StudentServices.getSingleStudentFromDB(studentId)
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'student retrived successfully',
      data: result
  });
  
})

const deleteStudent : RequestHandler = catchasync(async (req, res, next) =>{
  
    const {studentId}= req.params
    const result = await StudentServices.deleteStudentFromDB(studentId)

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'student deleted successfully',
      data: result
  })
  
})
const updateStudent : RequestHandler = catchasync(async (req, res, next) =>{
  
    const {studentId}= req.params
    const {student} = req.body
    const result = await StudentServices.updateStudentIntoDB(studentId, student)

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'student updated successfully',
      data: result
  })
  
})






export const StudentControllers={
    // createStudent,
    getAllStudent,
    getSingleStudent,
    deleteStudent,
    updateStudent
}
