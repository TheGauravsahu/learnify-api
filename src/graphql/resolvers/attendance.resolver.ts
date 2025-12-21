import { GraphQLContext } from "../context";
import { requireAuth } from "../guards/requireAuth";
import {
  attendanceService,
  ClassAttendanceInput,
} from "../../services/attendance.service";

export const attendanceResolver = {
  Query: {
    attendaces: async (
      _: any,
      args: { classId: string; date: string },
      ctx: GraphQLContext
    ) => {
      requireAuth(ctx);
      return await attendanceService.getAttendance(args.classId, args.date);
    },
  },

  Mutation: {
    markAttendance: async (
      _: any,
      args: { input: ClassAttendanceInput },
      ctx: GraphQLContext
    ) => {
      requireAuth(ctx);
      return await attendanceService.markAttendance(args.input);
    },
  },
};
