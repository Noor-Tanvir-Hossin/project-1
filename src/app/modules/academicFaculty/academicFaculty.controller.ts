import { StatusCodes } from "http-status-codes";
import catchasync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AcademicFacultySevices } from './academicFaculty.service';


const createAcademicFaculty = catchasync(async(req,res,next) =>{
    const result= await AcademicFacultySevices.createAcademicFacultyIntoDB(req.body)

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success:true,
        message:"Academic Faculty Created Successfully",
        data:result
    })

})

const getAllAcademicFaculty= catchasync(async (re,res,next) =>{
    const result= await AcademicFacultySevices.getAllAcademicFacultiesFromDB()

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success:true,
        message:"Academic Faculties retrieved Successfully",
        data: result
    })
})

const getAcademicFaculty= catchasync(async(req, res,next) =>{
    const {facultyID}= req.params
    const result= await AcademicFacultySevices.getAcademicFacultyFromDB(facultyID)

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success:true,
        message:"Academic Faculty retrieved Successfully",
        data: result
    })
})

const updateAcademicFaculty = catchasync( async(req, res, next) =>{
    const{facultyID} = req.params
    const result= await AcademicFacultySevices.updateAcademicFacultyIntoDB(facultyID, req.body)

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success:true,
        message:"Academic Faculty updated Successfully",
        data: result
    })

})

export const AcademicFacultyController= {
    createAcademicFaculty,
    getAllAcademicFaculty,
    getAcademicFaculty,
    updateAcademicFaculty
}