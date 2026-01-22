import { UserRoles } from "../../models/user.model";
import { studentService } from "../../services/student.service";
import { GetModelParams } from "../../utils";
import { validate } from "../../validators";
import {
  CreateStudentInput,
  createStudentSchema,
  UpdateStudentInput,
  updateStudentSchema,
} from "../../validators/student.validator";
import { GraphQLContext } from "../context";
import { requireRoles } from "../guards/requireRoles";

export const studentResolver = {
  Query: {
    students: async (
      _: any,
      { page = 1, limit = 10, sortBy, sortOrder, search }: GetModelParams,
      ctx: GraphQLContext,
    ) => {
      requireRoles(ctx, [UserRoles.ADMIN]);
      return studentService.getAllStudents({
        page,
        limit,
        sortBy,
        sortOrder,
        search,
      });
    },
    student: async (_: any, args: { id: string }, ctx: GraphQLContext) => {
      requireRoles(ctx, [UserRoles.ADMIN]);
      return studentService.getStudent(args.id);
    },
  },
  Mutation: {
    createStudent: async (
      _: any,
      args: { input: CreateStudentInput },
      ctx: GraphQLContext,
    ) => {
      requireRoles(ctx, [UserRoles.ADMIN]);
      const validatedInput = validate(createStudentSchema, args.input);
      return studentService.createStudent(validatedInput);
    },

    updateStudent: async (
      _: any,
      args: { id: string; input: UpdateStudentInput },
      ctx: GraphQLContext,
    ) => {
      requireRoles(ctx, [UserRoles.ADMIN]);
      const validatedInput = validate(updateStudentSchema, args.input);
      return studentService.updateStudent(args.id, validatedInput);
    },

    deleteStudent: async (
      _: any,
      args: { id: string },
      context: GraphQLContext,
    ) => {
      requireRoles(context, [UserRoles.ADMIN]);
      return studentService.deleteStudent(args.id);
    },
  },
};
