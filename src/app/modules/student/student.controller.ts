// import { Student } from './student.interface';
import { Request, Response } from 'express';
import { StudentServices } from './student.service';

const createStudent = async (req: Request, res: Response) => {
  try {
    const { student: studentData } = req.body;
    //will call service func to send this data
    const result = await StudentServices.createStudentIntoDB(studentData);

    //send response
    res.status(200).json({
      success: true,
      message: 'student is created successfully',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudentsFromDB();

    //send response
    res.status(200).json({
      success: true,
      message: 'students are retrieved successfully',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const result = await StudentServices.getSingleStudentFromDB(studentId);

    //send response
    res.status(200).json({
      success: true,
      message: 'student is retrieved successfully',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

export const Studentcontrollers = {
  createStudent,
  getAllStudents,
  getSingleStudent,
};
