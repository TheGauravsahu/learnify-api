import { GlobalTypeDef } from "./global.schema";
import { merge } from "lodash";
import { authResolver } from "./resolvers/auth.resolver";
import { AuthTypeDefs } from "./typeDefs/auth.typeDefs";
import { StudentTypeDefs } from "./typeDefs/student.typeDefs";
import { TeacherTypeDefs } from "./typeDefs/teacher.typeDefs";
import { studentResolver } from "./resolvers/student.resolver";
import { teacherResolver } from "./resolvers/teacher.resolver";
import { NoticeTypeDefs } from "./typeDefs/notice.typeDefs";
import { noticeResolver } from "./resolvers/notice.resolver";
import { HomeworkTypeDefs } from "./typeDefs/homework.typeDefs";
import { homeworkResolver } from "./resolvers/homework.resolver";
import { AttendanceTypeDefs } from "./typeDefs/attendance.typeDefs";
import { attendanceResolver } from "./resolvers/attendance.resolver";
import { DashboardTypeDefs } from "./typeDefs/dashboard.typeDefs";
import { dashboardResolver } from "./resolvers/dashboard.resolver";
import { ClassTypeDefs } from "./typeDefs/class.typeDefs";
import { classResolver } from "./resolvers/class.resolver";
import { SubjectTypeDefs } from "./typeDefs/subject.typeDefs";

export const typeDefs = [
  GlobalTypeDef,
  AuthTypeDefs,
  StudentTypeDefs,
  TeacherTypeDefs,
  NoticeTypeDefs,
  HomeworkTypeDefs,
  AttendanceTypeDefs,
  DashboardTypeDefs,
  ClassTypeDefs,
  SubjectTypeDefs,
];


export const resolvers = merge([
  authResolver,
  studentResolver,
  teacherResolver,
  noticeResolver,
  homeworkResolver,
  attendanceResolver,
  dashboardResolver,
  classResolver
]);
