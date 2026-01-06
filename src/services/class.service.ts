import { classModel } from "../models/class.model";

export interface ClassInput {
  name: string;
  section: string;
  academicYear: string;
  classTeacher?: string;
}

class ClassService {
  async createClass(input: ClassInput) {
    return await classModel.create(input);
  }

  async getAllClasses() {
    return await classModel
      .find()
      .populate({
        path: "classTeacher",
        populate: {
          path: "user",
          model: "users",
          select: "name email role",
        },
      })
      .sort({ createdAt: -1 });
  }

  async getClass(id: string) {
    return await classModel.findById(id).populate("classTeacher");
  }

  async updateClass(id: string, input: ClassInput) {
    const grade = await classModel
      .findByIdAndUpdate(id, input, {
        new: true,
      })
      .populate("classTeacher");
    if (!grade) throw new Error("No class found.");
    return grade;
  }

  async deleteClass(id: string) {
    await classModel.findByIdAndDelete(id);
    return true;
  }
}

export const classService = new ClassService();
