import { z } from "zod";

const userNameValidationSchema = z.object({
    firstName: z.string().min(1, "First name is required"),
    middleName: z.string().optional(), // Optional field
    lastName: z.string().min(1, "Last name is required"),
  });
  
  // Validation schema for guardian
  const guardianValidationSchema = z.object({
    fatherName: z.string().min(1, "Father's name is required"),
    fatherOccupation: z.string().min(1, "Father's occupation is required"),
    fatherContactNo: z.string().min(1, "Father's contact number is required"),
    motherName: z.string().min(1, "Mother's name is required"),
    motherOccupation: z.string().min(1, "Mother's occupation is required"),
    motherContactNo: z.string().min(1, "Mother's contact number is required"),
  });
  
  // Validation schema for student
   export const createStudentValidationSchema = z.object({
    body: z.object({
     
      password: z.string().max(20, "pass is required"),
     student: z.object({
      name: userNameValidationSchema, // Embedded schema
      gender: z.enum(["male", "female"], { required_error: "Gender is required" }),
      dateOfBirth: z.string().optional(), // Optional field
      email: z.string().email("Invalid email address"),
      contactNo: z.string().min(1, "Contact number is required"),
      emergencyContactNo: z.string().min(1, "Emergency contact number is required"),
      bloodGroup: z
        .enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"])
        .optional(), // Optional enum
      presentAddress: z.string().min(1, "Present address is required"),
      permanentAddress: z.string().min(1, "Permanent address is required"),
      guardian: guardianValidationSchema, // Embedded schema
      admissionSemester:z.string(),
      profileImg: z.string().optional(), // Optional field
      
     })
      
    })
   });

  export const studentValidations= {
     createStudentValidationSchema
  };