// import { Student } from './student.interface';
import { Request, Response } from 'express';
import { StudentServices } from './student.service';
// import Joi from 'joi';
// import studentValidationSchema from './student.validation';
import { z } from 'zod';
import studentValidationSchema from './student.validation';
const createStudent = async (req: Request, res: Response) => {
  try {
    //creating a schema validation using zod

    const { student: studentData } = req.body;

    //data validation using Joi
    // const { error, value } = studentValidationSchema.validate(studentData);

    // data validation using zod

    const zodparsedData = studentValidationSchema.parse(studentData);

    //will call service func to send this data
    const result = await StudentServices.createStudentIntoDB(zodparsedData);

    // if (error) {
    //   return res.status(500).json({
    //     success: false,
    //     message: 'something went wrong',
    //     error,
    //   });
    // }

    //send response
    res.status(200).json({
      success: true,
      message: 'student is created successfully',
      data: result,
    });
  } catch (err:any) {
    res.status(500).json({
      success: false,
      message: err.message || 'something went wrong',
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
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'something went wrong',
      error: err,
    });
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
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'something went wrong',
      error: err,
    });
  }
};


const deleteStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const result = await StudentServices.deleteStudentFromDB(studentId);

    //send response
    res.status(200).json({
      success: true,
      message: 'student is deleted successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'something went wrong',
      error: err,
    });
  }
};

export const Studentcontrollers = {
  createStudent,
  getAllStudents,
  getSingleStudent,
  deleteStudent
};
