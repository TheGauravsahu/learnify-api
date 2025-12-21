import { teacherModel } from "../models/teacher.model";

export interface TeacherInput {
  user: string;
  subject: string;
  experience: number;
}

class TeacherService {
  async getAllTeachers({ page, limit, sortBy, sortOrder }: any) {
    const skip = (page - 1) * limit;

    const sortMap: Record<string, string> = {
      name: "user.name",
      subject: "subject",
      experience: "experience",
      createdAt: "createdAt",
    };

    const teachers = await teacherModel
      .find()
      .populate("user")
      .sort({ [sortMap[sortBy]]: sortOrder === "asc" ? 1 : -1 })
      .skip(skip)
      .limit(limit);

    const total = await teacherModel.countDocuments();

    return {
      data: teachers,
      total,
      page,
      limit,
    };
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
