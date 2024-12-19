import express from 'express'
import { StudentControllers } from './student.controller'
import validateRequest from '../../middleware/validateRequest'
import { updateStudentValidationSchema } from './student.validation'

const router= express.Router()

//will call controller function
// router.post('/create-student', StudentControllers.createStudent)
router.get('/', StudentControllers.getAllStudent)
router.get('/:studentId', StudentControllers.getSingleStudent)
router.delete('/:studentId', StudentControllers.deleteStudent)
router.patch('/:studentId',validateRequest(updateStudentValidationSchema) ,StudentControllers.updateStudent)

export const StudentRoutes= router;