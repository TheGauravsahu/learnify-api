import { IStudent, studentModel } from "../models/student.model";
import { UserRoles } from "../models/user.model";
import { GetModelParams, toObjectId } from "../utils";
import {
  CreateStudentInput,
  UpdateStudentInput,
} from "../validators/student.validator";
import { authService } from "./auth.service";
import { BaseService } from "./base.service";

class StudentService extends BaseService<IStudent> {
  constructor() {
    super(studentModel);
  }

  async getAllStudents({
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
      studentModel
        .find(match)
        .populate("user class")
        .sort({ [sortBy]: sortOrder === "asc" ? 1 : -1 })
        .skip(skip)
        .limit(limit),
      studentModel.countDocuments(match),
    ]);

    return { data, total, page, limit };
  }

  async getStudent(id: string) {
    return studentModel.findById(id).populate("user class");
  }

  async createStudent(input: CreateStudentInput) {
    const { register, class: grade, ...rest } = input;
    const { user } = await authService.registerUser({
      ...register,
      role: UserRoles.STUDENT,
    });
    return this.create({
      ...rest,
      class: toObjectId(grade),
      user: user._id,
    });
  }

  async updateStudent(id: string, input: UpdateStudentInput) {
    const { register, class: grade, ...rest } = input;
    const updateData: Partial<IStudent> = {
      ...rest,
    };
    if (grade) {
      updateData.class = toObjectId(grade);
    }
    const student = await this.update(id, updateData);
    if (!student) throw new Error("Student not found");

    if (register) {
      await authService.updateUser(student.user.toString(), register);
    }
    return student;
  }

  async deleteStudent(id: string) {
    const student = await this.getById(id);
    if (!student) throw Error("Student not found.");
    await Promise.all([
      studentModel.findByIdAndDelete(id),
      authService.deleteUser(String(student.user)),
    ]);
    return true;
  }
}

export const studentService = new StudentService();
