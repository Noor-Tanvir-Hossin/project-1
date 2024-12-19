import { Schema, model } from 'mongoose';
import {
  StudentModel,
  Tguardian,
  Tstudent,
  TuserName,
} from './student.interface';
import bcrypt from 'bcrypt';
import config from '../../config';
import { AcademicSemester } from '../academicSemester/academicSemester.model';

const userNameSchema = new Schema<TuserName>({
  firstName: { type: String, required: true },
  middleName: { type: String, required: false }, // Optional field
  lastName: { type: String, required: true },
});

// Schema for guardian
const guardianSchema = new Schema<Tguardian>({
  fatherName: { type: String, required: true },
  fatherOccupation: { type: String, required: true },
  fatherContactNo: { type: String, required: true },
  motherName: { type: String, required: true },
  motherOccupation: { type: String, required: true },
  motherContactNo: { type: String, required: true },
});

// Schema for student
const studentSchema = new Schema<Tstudent, StudentModel>({
  id: { type: String, required: [true, 'id is rquired'], unique: true },
  user:{
    type: Schema.Types.ObjectId,
    required: [true, 'userID is rquired'],
    unique:true,
    ref:'User'
  },
 
  name: { type: userNameSchema, required: true }, // Embedded schema
  gender: { type: String, enum: ['male', 'female'], required: true },
  dateOfBirth: { type: String, required: false }, // Optional field
  email: { type: String, required: true },
  contactNo: { type: String, required: true },
  emergencyContactNo: { type: String, required: true },
  bloodGroup: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    required: false,
  }, // Optional enum
  presentAddress: { type: String, required: true },
  permanentAddress: { type: String, required: true },
  guardian: { type: guardianSchema, required: true }, // Embedded schema
  profileImg: { type: String, required: false }, // Optional field
  // isActive: { type: String, enum: ['active', 'inActive'], required: true },
  admissionSemester:{type:Schema.Types.ObjectId , ref: 'AcademicSemester'},
  isDeleted: {type: Boolean, default: false},
  academicDepartment:{type:Schema.Types.ObjectId , ref: 'AcademicDepartment'},

} ,
{
  toJSON:{
    virtuals: true
  }
});

studentSchema.virtual('fullName').get(function(){
  return `${this.name.firstName} ${this.name.middleName} ${this.name.lastName}`
})



// pre save middleware

//creating a custom static method
studentSchema.statics.isUserExist = async function (id: string) {
  const existingUser = await Student.findOne({ id });
  return existingUser;
};



studentSchema.pre('find', async function(next){
  this.find({isDeleted: { $ne: true}})

  next()

})
studentSchema.pre('findOne', async function(next){
  this.find({isDeleted: { $ne: true}})

  next()
})
studentSchema.pre('aggregate', async function(next){
  // this.find({isDeleted: { $ne: true}})
  this.pipeline().unshift({$match : { isDeleted : { $ne: true}}})

  next()
})







// creating a custom instance method
// studentSchema.methods.isUserExists= async function(id : string) {

//   const existingUser = await Student.findOne({id})
//   return existingUser;

// }

export const Student = model<Tstudent, StudentModel>('student', studentSchema);
