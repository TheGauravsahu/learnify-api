import { homeworkModel } from "../models/homework.model";

export interface HomeworkInput {
  description: string;
  subject: string;
  classId: string;
  dueDate: Date;
  teacherId: string;
}

class HomeworkService {
  async getAllHomeworks() {
    return await homeworkModel
      .find()
      .sort({ createdAt: -1 })
      .populate("teacherId");
  }

  async getHomework(id: string) {
    return await homeworkModel.findById(id).populate("teacherId");
  }

  async createHomework(input: HomeworkInput) {
    return await homeworkModel.create(input);
  }

  async updateHomework(id: string, input: HomeworkInput) {
    const homework = await homeworkModel.findByIdAndUpdate(id, input);
    if (!homework) throw Error("Homework not found.");
  }

  async deleteHomework(id: string) {
    await homeworkModel.findByIdAndDelete(id);
    return true;
  }
}

export const homeworkService = new HomeworkService();
