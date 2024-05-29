import express from 'express';
import { Studentcontrollers } from './student.controller';

const router = express.Router()

// will call controller function
router.post('/create-student', Studentcontrollers.createStudent)

export const studentRoutes = router;