import { studentModel } from "../models/student.model";

export interface StudentInput {
  user: string;
  class: string;
  section: string;
  rollNumber: number;
  gender: string;
}

class StudentService {
  async getAllStudents() {
    return studentModel.find().populate("user");
  }

  async getStudent(id: string) {
    return studentModel.findById(id).populate("user");
  }

  async createStudent(input: StudentInput) {
    return await studentModel.create(input);
  }

  async updateStudent(id: string, input: StudentInput) {
    const student = await studentModel.findByIdAndUpdate(id, input, {
      new: true,
    });
    if (!student) {
      throw new Error("Student not found");
    }
    return student;
  }

  async deleteStudent(id: string) {
    await studentModel.findByIdAndDelete(id);
    return true;
  }
}

export const studentService = new StudentService();
