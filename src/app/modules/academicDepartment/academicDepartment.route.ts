import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { AcademicDepartmentValidation } from './academicDepartment.validatio';
import { AcademicDepartmentControllers } from './academicDepartment.controller';
// import validateRequest from '../../middlewares/validateRequest';
// import { AcademicDepartmentControllers } from './academicDepartment.controller';
// import { AcademicDepartmentValidation } from './academicDepartment.validation';

const router = express.Router();

router.post(
  '/create-academic-department',
  validateRequest(
    AcademicDepartmentValidation.createAcademicDepartmentValidationSchema,
  ),
  AcademicDepartmentControllers.createAcademicDepartmemt,
);

router.get(
  '/:departmentId',
  AcademicDepartmentControllers.getSingleAcademicDepartment,
);

router.patch(
  '/:departmentId',
  validateRequest(
    AcademicDepartmentValidation.updateAcademicDepartmentValidationSchema,
  ),
  AcademicDepartmentControllers.updateAcademicDeartment,
);

router.get('/', AcademicDepartmentControllers.getAllAcademicDepartments);

export const AcademicDepartmentRoutes = router;