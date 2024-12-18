// import { error } from "console";
import { Tstudent } from "./student.interface";
import { Student } from "./student.model";

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

const getALLStudentFromDB= async ()=>{

    const result= await Student.find()
    return result
}

const getSingleStudentFromDB= async (id : string) =>{
    const result = await Student.findOne({id})
    return result
}
const deleteStudentFromDB= async (id : string) =>{
    const result = await Student.updateOne({id}, {isDeleted: true})
    return result
}

export const StudentServices={
    // createStudentIntoDB,   
    getALLStudentFromDB,
    getSingleStudentFromDB,
    deleteStudentFromDB
}