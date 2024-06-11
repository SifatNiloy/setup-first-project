import { Schema, model } from 'mongoose';
import {
  TStudent,
  TLocalGuardian,
  TUserName,
  TGuardian,
  StudentModel,
  // StudentMethods,
} from './student.interface';
import validator from 'validator';
import bcrypt from 'bcrypt';
import config from '../../config';

const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
    maxlength: [20, 'First name can not be more than 20 characters'],
    // validate: {
    //   validator: function (value: string) {
    //     const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);
    //     return firstNameStr === value;
    //   },
    //   message: '{VALUE} is not in capitalize format',
    // },
  },
  middleName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    trim: true,
    required: [true, 'Last name is required'],
    // validate:{
    //     validator: (value: string)=>validator.isAlpha(value),
    //     message: '{VALUE} is not valid'
    // }
  },
});

const guardianSchema = new Schema<TGuardian>({
  fatherName: {
    type: String,
    trim: true,
    required: [true, "Father's name is required"],
  },
  fatherOccupation: {
    type: String,
    trim: true,
    required: [true, "Father's occupation is required"],
  },
  fatherContactNo: {
    type: String,
    trim: true,
    required: [true, "Father's contact number is required"],
  },
  motherName: {
    type: String,
    trim: true,
    required: [true, "Mother's name is required"],
  },
  motherOccupation: {
    type: String,
    trim: true,
    required: [true, "Mother's occupation is required"],
  },
  motherContactNo: {
    type: String,
    trim: true,
    required: [true, "Mother's contact number is required"],
  },
});

const localGuardianSchema = new Schema<TLocalGuardian>({
  name: {
    type: String,
    trim: true,
    required: [true, "Local guardian's name is required"],
  },
  occupation: {
    type: String,
    trim: true,
    required: [true, "Local guardian's occupation is required"],
  },
  contactNo: {
    type: String,
    trim: true,
    required: [true, "Local guardian's contact number is required"],
  },
  address: {
    type: String,
    trim: true,
    required: [true, "Local guardian's address is required"],
  },
});

const studentSchema = new Schema<TStudent, StudentModel>({
  id: {
    type: String,
    trim: true,
    required: [true, 'Student ID is required'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Student ID is required'],
    unique: true,
    maxlength: [20, `password can't be more than 20 characters`],
  },
  name: {
    type: userNameSchema,
    trim: true,
    required: [true, "Student's name is required"],
  },
  gender: {
    type: String,
    trim: true,
    enum: {
      values: ['male', 'female', 'other'],
      message:
        '{VALUE} is not a valid gender. Please select male, female, or other.',
    },
    required: [true, 'Gender is required'],
  },
  dateOfBirth: {
    type: String,
    trim: true,
    required: [true, 'Date of birth is required'],
  },
  email: {
    type: String,
    trim: true,
    required: [true, 'Email is required'],
    unique: true,
    // validate:{
    //     validator: (value: string)=>validator.isEmail(value),
    //     message: '{VALUE} is not a valid email type'
    // }
  },
  contactNo: {
    type: String,
    trim: true,
    required: [true, 'Contact number is required'],
  },
  emergencyContactNo: {
    type: String,
    trim: true,
    required: [true, 'Emergency contact number is required'],
  },
  bloodGroup: {
    type: String,
    trim: true,
    enum: {
      values: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
      message: '{VALUE} is not a valid blood group.',
    },
  },
  presentAddress: {
    type: String,
    trim: true,
    required: [true, 'Present address is required'],
  },
  permanentAddress: {
    type: String,
    trim: true,
    required: [true, 'Permanent address is required'],
  },
  guardian: {
    type: guardianSchema,
    trim: true,
    required: [true, 'Guardian information is required'],
  },
  localGuardian: {
    type: localGuardianSchema,
    trim: true,
    required: [true, 'Local guardian information is required'],
  },
  profileImg: {
    type: String,
    trim: true,
    required: [false, 'Profile image is optional'],
  },
  isActive: {
    type: String,
    trim: true,
    enum: {
      values: ['active', 'inActive'],
      message:
        '{VALUE} is not a valid status. Please select active or inActive.',
    },
    default: 'active',
  },
});

//pre save middleware / hook : will work on create () save()
studentSchema.pre('save', async function (next) {
  // console.log(this, 'pre hook : we will save the data');
  const user = this;
  //hashing password and save into DB
  user.password= await bcrypt.hash(user.password, Number(config.bcrypt_salt_rounds));
  next();
});

// post save middleware  hook
studentSchema.post('save', function () {
  // console.log(this, 'post hook : we saved our  data');
});

// creating a custom static method
studentSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await Student.findOne({ id });
  return existingUser;
};

// creating a custom instance method
// studentSchema.methods.isUserExists = async function(id: string){
//   const existingUser = await Student.findOne({id});
//   return existingUser;
// }

export const Student = model<TStudent, StudentModel>('Student', studentSchema);
