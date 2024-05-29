import express from 'express';
import { Studentcontrollers } from './student.controller';

const router = express.Router();

// will call controller function
router.post('/create-student', Studentcontrollers.createStudent);

router.get('/', Studentcontrollers.getAllStudents);

router.get('/:studentId', Studentcontrollers.getSingleStudent);

export const studentRoutes = router;
