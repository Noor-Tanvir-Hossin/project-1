import { object } from "zod";
import config from "../../config";
import { Tstudent } from "../student/student.interface";
import {  Tuser } from "./user.interface";
import { User } from "./user.model";
import { Student } from "../student/student.model";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { generateStudentId } from "./user.utils";
import mongoose from "mongoose";
import AppError from "../../errors/AppError";
import { StatusCodes } from "http-status-codes";

const createStudentIntoDB= async (password: string ,payload: Tstudent) =>{
    // if( await User.isUserExist(studentData.id)){
    //     throw new Error ('Student already exists')
    // }


    //create a user
    const userData : Partial<Tuser>= {}

    //if password is not given
    userData.password= password || (config.default_password as string)

    //  set student role
    userData.role= 'student'

    // //set manually generated ID
    // userData.id= '2030100001'

    const admissionSemester = await AcademicSemester.findById(
        payload.admissionSemester,
      );

     //set  generated id
//   userData.id = await generateStudentId(admissionSemester);

    //create a user
    // const newUser= await User.create(userData)

    // //create a student
    // if(Object.keys(newUser).length){
    //     payload.id= newUser.id,
    //     payload.user= newUser._id

    //     const newStudent = await Student.create(payload)
    //     return newStudent
    // }

    const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //set  generated id
    userData.id = await generateStudentId(admissionSemester);

    // create a user (transaction-1)
    const newUser = await User.create([userData], { session }); // array

    //create a student
    if (!newUser.length) {
      throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to create user');
    }
    // set id , _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //reference _id

    // create a student (transaction-2)

    const newStudent = await Student.create([payload], { session });

    if (!newStudent.length) {
      throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to create student');
    }

    await session.commitTransaction();
    await session.endSession();

    return newStudent;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error('Failed to create student');
  }
};


export const userService= {
    createStudentIntoDB
}