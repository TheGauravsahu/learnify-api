import { teacherModel } from "../models/teacher.model";

export interface TeacherInput {
  user: string;
  subject: string;
  experience: number;
}

class TeacherService {
  async getAllTeachers() {
    return await teacherModel.find().populate("user").sort({ createdAt: -1 });
  }

  async getTeacher(id: string) {
    return await teacherModel.findById(id).populate("user");
  }

  async createTeacher(input: TeacherInput) {
    return await teacherModel.create(input);
  }

  async updateTeacher(id: string, input: TeacherInput) {
    const teacher = await teacherModel.findByIdAndUpdate(id, input, {
      new: true,
    });
    if (!teacher) {
      throw new Error("Teacher not found");
    }
    return teacher;
  }

  async deleteTeacher(id: string) {
    await teacherModel.findByIdAndDelete(id);
    return true;
  }
}

export const teacherService = new TeacherService();
