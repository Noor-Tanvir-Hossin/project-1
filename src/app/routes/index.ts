import { Router } from "express"
import { UserRoutes } from "../modules/user/user.route"
import { StudentRoutes } from "../modules/student/student.route"
import { AcademicSemesterRoutes } from "../modules/academicSemester/academicSemester.route"
import { AcademicFaculty } from "../modules/academicFaculty/academicFaculty.model"
import { academicFacultyRoutes } from "../modules/academicFaculty/academicFaculty.route"
import { AcademicDepartmentRoutes } from "../modules/academicDepartment/academicDepartment.route"


const router= Router()

// router.use('/users', UserRoutes)
// router.use('/students', StudentRoutes)



const moduleRoutes = [
    {
        path: '/users',
        route: UserRoutes
    },
    {
        path: '/students',
        route: StudentRoutes
    },
    {
        path: '/academic-semesters',
        route: AcademicSemesterRoutes
    },
    {
        path: '/academic-faculties',
        route: academicFacultyRoutes
    },
    {
        path: '/academic-departements',
        route: AcademicDepartmentRoutes
    },

]

moduleRoutes.forEach((route) => router.use(route.path, route.route))

export default router