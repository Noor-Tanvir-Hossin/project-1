// import { error } from "console";
import mongoose from 'mongoose';
import { Tstudent } from './student.interface';
import { Student } from './student.model';
import AppError from '../../errors/AppError';
import { StatusCodes } from 'http-status-codes';
import { User } from '../user/user.model';
// import { object } from "zod";
// import { path } from 'path';

// const createStudentIntoDB= async (studentdata:Tstudent)=>{

//    if(await Student.isUserExist(studentdata.id)){
//     throw new Error ('user already exists')
//    }

//    const result= await Student.create(studentdata) // built in static method

// // const student =  new Student(studentdata)

// // if(await student.isUserExists(studentdata.id)){
// //     throw new Error ('user already exists')
// // }

// // const result = await student.save() // built in instance method
//    return result;
// };

const getALLStudentFromDB = async () => {
  const result = await Student.find()
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });
  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  const result = await Student.findOne({ id })
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });
  return result;
};

const updateStudentIntoDB = async (id: string, payload: Partial<Tstudent>) => {
  const { name, guardian, ...remainStudentData } = payload;

  const modifiedData: Record<string, unknown> = { ...remainStudentData };

  /*
    guardain: {
      fatherOccupation:"Teacher"
    }

    guardian.fatherOccupation = Teacher

    name.firstName = 'Mezba'
    name.lastName = 'Abedin'
  */

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedData[`name.${key}`] = value;
    }
  }

  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedData[`guardian.${key}`] = value;
    }
  }

  const result = await Student.findOneAndUpdate({ id }, modifiedData,{
    new:true, runValidators:true
  });
  return result;
};

const deleteStudentFromDB = async (id: string) => {
  // const result = await Student.updateOne({id}, {isDeleted: true})
  // return result
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const deletedStudent = await Student.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedStudent) {
      throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to delete student');
    }

    const deletedUser = await User.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedUser) {
      throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to delete user');
    }

    await session.commitTransaction();
    await session.endSession();

    return deletedStudent;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error('Failed to delete student');
  }
};

export const StudentServices = {
  // createStudentIntoDB,
  getALLStudentFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB,
  updateStudentIntoDB,
};
