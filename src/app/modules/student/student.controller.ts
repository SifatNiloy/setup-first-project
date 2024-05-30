// import { Student } from './student.interface';
import { Request, Response } from 'express';
import { StudentServices } from './student.service';
import Joi from 'joi';
import studentValidationSchema from './student.validation';
const createStudent = async (req: Request, res: Response) => {
  try {

    const { student: studentData } = req.body;
    
    //will call service func to send this data
    const result = await StudentServices.createStudentIntoDB(studentData); 


    const { error } = studentValidationSchema.validate(studentData);
    if (error) {
      return res.status(500).json({
        success: false,
        message: 'something went wrong',
        error,
      });
    }

    

    //send response
    res.status(200).json({
      success: true,
      message: 'student is created successfully',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'something went wrong',
      error: err,
    });
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
