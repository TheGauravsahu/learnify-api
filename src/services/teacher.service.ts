import { teacherModel } from "../models/teacher.model";
import { UserRoles } from "../models/user.model";
import { authService, RegisterInput } from "./auth.service";

export interface TeacherInput {
  register: RegisterInput;
  subject: string;
  experience: number;
}

interface GetTeachersParams {
  page: number;
  limit: number;
  sortBy?: "name" | "subject" | "experience" | "createdAt";
  sortOrder?: "asc" | "desc";
  search?: string;
}

class TeacherService {
  async getAllTeachers({
    page = 1,
    limit = 10,
    sortBy = "createdAt",
    sortOrder = "desc",
    search = "",
  }: GetTeachersParams) {
    page = Math.max(1, page);
    limit = Math.max(1, limit);
    const skip = (page - 1) * limit;

    const sortMap: Record<string, string> = {
      name: "user.name",
      subject: "subject",
      experience: "experience",
      createdAt: "createdAt",
    };

    const sortField = sortMap[sortBy] || "createdAt";
    const order = sortOrder === "asc" ? 1 : -1;

    const matchStage = search
      ? {
          $or: [
            { subject: { $regex: search, $options: "i" } },
            { "user.name": { $regex: search, $options: "i" } },
            { "user.email": { $regex: search, $options: "i" } },
          ],
        }
      : {};

    // ---------- aggregation ----------
    const result = await teacherModel.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "_id",
          as: "user",
        },
      },
      { $unwind: "$user" },
      { $match: matchStage },
      {
        $facet: {
          data: [
            { $sort: { [sortField]: order } },
            { $skip: skip },
            { $limit: limit },
          ],
          totalCount: [{ $count: "count" }],
        },
      },
    ]);

    return {
      data: result[0].data,
      total: result[0].totalCount[0]?.count || 0,
      page,
      limit,
    };
  }

  async getTeacher(id: string) {
    return await teacherModel.findById(id).populate("user");
  }

  async createTeacher(input: TeacherInput) {
    const { register, subject, experience } = input;

    const { user } = await authService.registerUser({
      name: register.name,
      email: register.email,
      password: register.password,
      sendWelcomeEmail: register.sendWelcomeEmail,
      role: UserRoles.TEACHER,
    });
    return await teacherModel.create({ subject, experience, user: user._id });
  }

  async updateTeacher(id: string, input: TeacherInput) {
    const { register, ...teacherData } = input;
    const teacher = await teacherModel.findByIdAndUpdate(id, teacherData, {
      new: true,
      runValidators: true,
    });
    if (!teacher) {
      throw new Error("Teacher not found");
    }

    await authService.updateUser(teacher.user.toString(), register);
    return teacher;
  }

  async deleteTeacher(id: string) {
    await teacherModel.findByIdAndDelete(id);
    return true;
  }
}

export const teacherService = new TeacherService();
