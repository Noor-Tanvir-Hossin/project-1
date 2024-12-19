import { z } from "zod";

const createAcademicFacultyValiationSchema= z.object({
    body:z.object({
        name: z.string({
            invalid_type_error: 'Academic faculty must be string'
        })
    })
})
const updateAcademicFacultyValiationSchema=z.object({
    body:z.object({
        name: z.string({
            invalid_type_error: 'Academic faculty must be string'
        })
    })
})

export const academicFacultyValidation= {
    createAcademicFacultyValiationSchema,
    updateAcademicFacultyValiationSchema
}