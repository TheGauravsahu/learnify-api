import { noticeModel } from "../models/notice.model";
import { studentModel } from "../models/student.model";
import { teacherModel } from "../models/teacher.model";

class DashboardService {
  async getAdminDashboard() {
    // TODO: add parents, staffs, events, etc.
    const [students, teachers, notices] = await Promise.all([
      studentModel.countDocuments(),
      teacherModel.countDocuments(),
      noticeModel.countDocuments(),
    ]);

    const genderAggregation = await studentModel.aggregate([
      {
        $group: {
          _id: "gender",
          count: { $sum: 1 },
        },
      },
    ]);
    const genderStats = {
      boys: genderAggregation.find((g) => g._id === "MALE")?.count || 0,
      girls: genderAggregation.find((g) => g._id === "FEMALE")?.count || 0,
    };

    const classWiseStudentsAggregation = await studentModel.aggregate([
      {
        $group: {
          _id: "$classId",
          count: { $sum: 1 },
        },
      },
    ]);
    const classWiseStudents = classWiseStudentsAggregation.map((item) => ({
      classId: item._id,
      count: item.count,
    }));

    const latestNotices = await noticeModel
      .find()
      .sort({ createdAt: -1 })
      .limit(5);

    return {
      counts: {
        students,
        teachers,
        parents: 0, // TODO
        classes: classWiseStudents.length,
        notices,
      },
      genderStats,
      classWiseStudents,
      latestNotices,
    };
  }
}

export const dashboardService = new DashboardService();
