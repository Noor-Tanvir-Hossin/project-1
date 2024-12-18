import { object } from "zod";
import config from "../../config";
import { Tstudent } from "../student/student.interface";
import {  Tuser } from "./user.interface";
import { User } from "./user.model";
import { Student } from "../student/student.model";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { generateStudentId } from "./user.utils";

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
  userData.id = await generateStudentId(admissionSemester);

    //create a user
    const newUser= await User.create(userData)

    //create a student
    if(Object.keys(newUser).length){
        payload.id= newUser.id,
        payload.user= newUser._id

        const newStudent = await Student.create(payload)
        return newStudent
    }
}

export const userService= {
    createStudentIntoDB
}