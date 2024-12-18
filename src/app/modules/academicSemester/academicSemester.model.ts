import { Schema, model } from "mongoose";
// import { Tuser } from "./user.interface";
// import bcrypt from 'bcrypt';
// import config from "../../config";
import { TAcademicSemester, TMonth } from "./academicSemester.interface";
import { AcademicSemesterCode, AcademicSemesterName } from "./academicSemester.constant";

const months: TMonth[] = [
    "January", "February", "March", "April", 
    "May", "June", "July", "August", 
    "September", "October", "November", "December"
  ];

const academicSemesterSchema = new Schema<TAcademicSemester>({
    name: {
        type: String,
        required: true,
        enum: AcademicSemesterName,
    },
    code: {
        type: String,
        required: true,
        enum: AcademicSemesterCode,
    },
    year: {
        type: String,
        required: true
    },
    startMonth:{
        type: String,
        required: true,
        enum: months
    },
    endMonth:{
        type: String,
        required: true,
        enum: months
        
    },
      
},
    {
        timestamps:true,
    }
)

academicSemesterSchema.pre('save', async function (next) {
    const isSemesterExists = await AcademicSemester.findOne({
      year: this.year,
      name: this.name,
    });
  
    if (isSemesterExists) {
      throw new Error('Semester is already exists !');
    }
    next();
  });


export const AcademicSemester= model<TAcademicSemester>('AcademicSemester', academicSemesterSchema)