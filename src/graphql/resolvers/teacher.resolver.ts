import { UserRoles } from "../../models/user.model";
import { TeacherInput, teacherService } from "../../services/teacher.service";
import { GraphQLContext } from "../context";
import { requireRoles } from "../guards/requireRoles";

export const teacherResolver = {
  Query: {
    teachers: async (
      _: any,
      { page = 1, limit = 10, sortBy, sortOrder, search }: any,
      ctx: GraphQLContext
    ) => {
      requireRoles(ctx, [UserRoles.ADMIN]);
      return teacherService.getAllTeachers({ page, limit, sortBy, sortOrder,search });
    },
    teacher: async (_: any, args: { id: string }, ctx: GraphQLContext) => {
      requireRoles(ctx, [UserRoles.ADMIN]);
      return teacherService.getTeacher(args.id);
    },
  },
  Mutation: {
    createTeacher: async (
      _: any,
      args: { input: TeacherInput },
      ctx: GraphQLContext
    ) => {
      requireRoles(ctx, [UserRoles.ADMIN]);
      return teacherService.createTeacher(args.input);
    },

    updateTeacher: async (
      _: any,
      args: { id: string; input: TeacherInput },
      ctx: GraphQLContext
    ) => {
      requireRoles(ctx, [UserRoles.ADMIN]);
      return teacherService.updateTeacher(args.id, args.input);
    },

    deleteTeacher: async (
      _: any,
      args: { id: string },
      ctx: GraphQLContext
    ) => {
      requireRoles(ctx, [UserRoles.ADMIN]);
      return teacherService.deleteTeacher(args.id);
    },
  },
};
