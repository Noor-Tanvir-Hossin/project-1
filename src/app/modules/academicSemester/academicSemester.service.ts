import { StatusCodes } from "http-status-codes";
import AppError from "../../errors/AppError";
import { academicSemesterNameCodeMapper } from "./academicSemester.constant";
import { TAcademicSemester } from "./academicSemester.interface";
import { AcademicSemester } from "./academicSemester.model";


const createAcademicSemesterIntoDB = async(payload: TAcademicSemester) =>{

    type TAcademicSemesterCodeMaper= {
        [key:string]: string
    }

    // const academicSemesterCodeMaper: TAcademicSemesterCodeMaper ={
    //     Autumn:'01',
    //     Summer:'02',
    //     Fall: '02'
    // }

    if(academicSemesterNameCodeMapper[payload.name] !== payload.code){
        throw new AppError(StatusCodes.NOT_FOUND,'Invalid Semester Code');
    }

    const result= await AcademicSemester.create(payload)
    return result
}

const getAllAcademicSemestersFromDB = async () => {
    const result = await AcademicSemester.find();
    return result;
  };

  const getSingleAcademicSemesterFromDB = async (id: string) => {
    const result = await AcademicSemester.findById(id);
    return result;
  };

  const updateAcademicSemesterIntoDB = async (
    id: string,
    payload: Partial<TAcademicSemester>,
  ) => {
    if (
      payload.name &&
      payload.code &&
      academicSemesterNameCodeMapper[payload.name] !== payload.code
    ) {
      throw new AppError(StatusCodes.NOT_FOUND,'Invalid Semester Code');
    }
  
    const result = await AcademicSemester.findOneAndUpdate({ _id: id }, payload, {
      new: true,
    });
    return result;
  };

export const AcademicSemesterSevices= {
    createAcademicSemesterIntoDB,
    getAllAcademicSemestersFromDB,
    getSingleAcademicSemesterFromDB,
    updateAcademicSemesterIntoDB
}