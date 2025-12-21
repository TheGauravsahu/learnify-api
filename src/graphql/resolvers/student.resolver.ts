import { UserRoles } from "../../models/user.model";
import {
  StudentInput,
  studentService,
} from "../../services/student.service";
import { GraphQLContext } from "../context";
import { requireRoles } from "../guards/requireRoles";

export const studentResolver = {
  Query: {
    students: async (_: any, __: any, ctx: GraphQLContext) => {
      requireRoles(ctx, [UserRoles.ADMIN]);
      return studentService.getAllStudents();
    },
    student: async (_: any, args: { id: string }, ctx: GraphQLContext) => {
      requireRoles(ctx, [UserRoles.ADMIN]);
      return studentService.getStudent(args.id);
    },
  },
  Mutation: {
    createStudent: async (
      _: any,
      args: { input: StudentInput },
      ctx: GraphQLContext
    ) => {
      requireRoles(ctx, [UserRoles.ADMIN]);
      return studentService.createStudent(args.input);
    },

    updateStudent: async (
      _: any,
      args: { id: string; input: StudentInput },
      ctx: GraphQLContext
    ) => {
      requireRoles(ctx, [UserRoles.ADMIN]);
      return studentService.updateStudent(args.id, args.input);
    },

    deleteStudent: async (
      _: any,
      args: { id: string },
      context: GraphQLContext
    ) => {
      requireRoles(context, [UserRoles.ADMIN]);
      return studentService.deleteStudent(args.id);
    },
  },
};
