import { noticeModel } from "../models/notice.model";

export interface NoticeInput {
  title: string;
  description: string;
  createdBy: string;
}

class NoticeService {
  async createNotice(input: NoticeInput) {
    return await noticeModel.create(input);
  }

  async getAllNotices() {
    return await noticeModel.find().sort({ createdBy: -1 }).populate("createdBy");
  }

  async getNotice(id: string) {
    return await noticeModel.findById(id).populate("createdBy");
  }

  async deleteNotice(id: string) {
    await noticeModel.findByIdAndDelete(id);
    return true;
  }

  async updateNotice(id: string, input: NoticeInput) {
    const notice = await noticeModel.findByIdAndUpdate(id, input, {
      new: true,
    });
    if (!notice) {
      throw new Error("Notice not found");
    }
    return notice;
  }
}

export const noticeService = new NoticeService();
