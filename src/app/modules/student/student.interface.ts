import { Model, Types } from "mongoose";


export type TuserName= {
    firstName: string;
    middleName?: string;
    lastName:string
}

export type Tguardian= {
    fatherName: string,
    fatherOccupation: string,
    fatherContactNo: string,
    motherName: string,
    motherOccupation: string,
    motherContactNo: string,

}


export type Tstudent= {
    id: string,
    user:Types.ObjectId
    password: string,
    name:TuserName,
    gender: "male" | "female",
    dateOfBirth?: string,
    email: string,
    contactNo: string,
    emergencyContactNo: string,
    bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-',
    presentAddress: string,
    permanentAddress: string,
    guardian: Tguardian,
    profileImg?:string,
    admissionSemester:Types.ObjectId;
    // isActive: 'active' | "inActive",
    isDeleted:boolean    
}

// for creating custom static

export interface StudentModel extends Model<Tstudent> {
   isUserExist(id: string) : Promise<Tstudent | null>
  }





// for creating custom instance
// export type StudentMethods= {
//     isUserExists(id: string) : Promise<Tstudent | null>
// }

// export type StudentModel = Model<
// Tstudent,
// Record<string, never>,
// StudentMethods
// >


