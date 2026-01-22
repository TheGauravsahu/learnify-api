import { teacherModel, ITeacher } from "../models/teacher.model";
import { UserRoles } from "../models/user.model";
import { GetModelParams, toObjectId } from "../utils";
import {
  CreateTeacherInput,
  UpdateTeacherInput,
} from "../validators/teacher.validator";
import { authService } from "./auth.service";
import { BaseService } from "./base.service";

class TeacherService extends BaseService<ITeacher> {
  constructor() {
    super(teacherModel);
  }

  async getAllTeachers({
    page = 1,
    limit = 10,
    sortBy = "createdAt",
    sortOrder = "desc",
    search = "",
  }: GetModelParams) {
    const skip = (page - 1) * limit;
    const match = search
      ? {
          name: { $regex: search, $options: "i" },
        }
      : {};

    const [data, total] = await Promise.all([
      teacherModel
        .find(match)
        .populate("user subjects classes")
        .sort({ [sortBy]: sortOrder === "asc" ? 1 : -1 })
        .skip(skip)
        .limit(limit),
      teacherModel.countDocuments(match),
    ]);

    return { data, total, page, limit };
  }

  async getTeacher(id: string) {
    const teacher = await this.model
      .findById(id)
      .populate("user subjects classes");

    if (!teacher) throw new Error("Teacher not found");
    return teacher;
  }

  async createTeacher(input: CreateTeacherInput) {
    const { register, subjects, classes, ...rest } = input;
    const { user } = await authService.registerUser({
      ...register,
      role: UserRoles.TEACHER,
    });
    return this.create({
      ...rest,
      user: user._id,
      subjects: subjects.map((id) => toObjectId(id)),
      classes: classes?.map((id) => toObjectId(id)),
    });
  }

  async updateTeacher(id: string, input: UpdateTeacherInput) {
    const { register, subjects, classes, ...rest } = input;
    const updateData: Partial<ITeacher> = {
      ...rest,
    };
    if (subjects) {
      updateData.subjects = subjects.map((id) => toObjectId(id));
    }
    if (classes) {
      updateData.classes = classes.map((id) => toObjectId(id));
    }

    const teacher = await this.update(id, updateData);
    if (!teacher) throw new Error("Teacher not found");

    if (register) {
      await authService.updateUser(teacher.user.toString(), register);
    }
    return teacher;
  }

  async deleteTeacher(id: string) {
    const teacher = await this.getById(id);
    if (!teacher) throw new Error("Teacher not found");
    await Promise.all([
      authService.deleteUser(teacher.user.toString()),
      this.delete(id),
    ]);
    return true;
  }
}

export const teacherService = new TeacherService();
