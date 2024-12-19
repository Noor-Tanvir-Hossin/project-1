import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { academicFacultyValidation } from './academicFaculty.validation';
import { AcademicFacultyController } from './academicFaculty.controller';

const router = express.Router();

router.post(
  '/create-academic-faculty',
  validateRequest(
    academicFacultyValidation.updateAcademicFacultyValiationSchema,
  ),
  AcademicFacultyController.createAcademicFaculty,
);

router.get('/', AcademicFacultyController.getAllAcademicFaculty);

router.get('/:facultyID', AcademicFacultyController.getAcademicFaculty);

router.patch(
  '/:facultyID',
  validateRequest(
    academicFacultyValidation.updateAcademicFacultyValiationSchema,
  ),
  AcademicFacultyController.updateAcademicFaculty,
);

export const academicFacultyRoutes= router