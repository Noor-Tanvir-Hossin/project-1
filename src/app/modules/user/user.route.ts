import express, { NextFunction, Request, Response } from 'express';
import { userController } from './user.controller';
// import { Schema } from 'mongoose'
// import { AnyZodObject } from 'zod';
import { studentValidations } from '../student/student.validation';
import validateRequest from '../../middleware/validateRequest';
// import { StudentControllers } from '../student/student.controller'

const router = express.Router();



router.post('/create-student', validateRequest(studentValidations.createStudentValidationSchema) ,userController.createStudent);

export const UserRoutes = router;
