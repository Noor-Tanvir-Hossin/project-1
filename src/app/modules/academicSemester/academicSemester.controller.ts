import { StatusCodes } from "http-status-codes";
import catchasync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AcademicSemesterSevices } from "./academicSemester.service";

const createAcademicSemester= catchasync(async(req, res, next) =>{
    
    const result= await AcademicSemesterSevices.createAcademicSemesterIntoDB(req.body)

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Academic semester created successfully',
        data: result
    })
})


const getAllAcademicSemesters = catchasync(async (req, res) => {
    const result = await AcademicSemesterSevices.getAllAcademicSemestersFromDB();
  
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Academic semesters are retrieved successfully',
      data: result,
    });
  });

  const getSingleAcademicSemester = catchasync(async (req, res) => {
    const { semesterId } = req.params;
    const result =
      await AcademicSemesterSevices.getSingleAcademicSemesterFromDB(semesterId);
  
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Academic semester is retrieved succesfully',
      data: result,
    });
  });

  const updateAcademicSemester = catchasync(async (req, res) => {
    const { semesterId } = req.params;
    const result = await AcademicSemesterSevices.updateAcademicSemesterIntoDB(
      semesterId,
      req.body,
    );
  
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Academic semester is retrieved succesfully',
      data: result,
    });
  });

export const AcademicSemesterController = {
    createAcademicSemester,
    getAllAcademicSemesters,
    getSingleAcademicSemester,
    updateAcademicSemester
}