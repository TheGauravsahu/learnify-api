import { teacherModel } from "../models/teacher.model";

export interface TeacherInput {
  user: string;
  subject: string;
  experience: number;
}

class TeacherService {
  async getAllTeachers({ page, limit, sortBy, sortOrder, search }: any) {
    const skip = (page - 1) * limit;

    const filter: any = {};

    if (search) {
      filter.$or = [{ subject: { $regex: search, $options: "i" } }];
    }

    const sortMap: Record<string, string> = {
      name: "user.name",
      subject: "subject",
      experience: "experience",
      createdAt: "createdAt",
    };

    const teachers = await teacherModel.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "_id",
          as: "user",
        },
      },
      { $unwind: "$user" },
      {
        $match: search
          ? {
              $or: [
                { subject: { $regex: search, $options: "i" } },
                { "user.name": { $regex: search, $options: "i" } },
                { "user.email": { $regex: search, $options: "i" } },
              ],
            }
          : {},
      },
      { $sort: { [sortMap[sortBy]]: sortOrder === "asc" ? 1 : -1 } },
      { $skip: skip },
      { $limit: limit },
    ]);

    console.log(teachers);

    const filteredTeachers = teachers.filter((t) => t.user);

    console.log(filteredTeachers);

    const total = await teacherModel.countDocuments(filter);

    return {
      data: filteredTeachers,
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
