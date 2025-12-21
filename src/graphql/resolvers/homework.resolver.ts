import { UserRoles } from "../../models/user.model";
import { HomeworkInput, homeworkService } from "../../services/homework.service";
import { GraphQLContext } from "../context";
import { requireAuth } from "../guards/requireAuth";
import { requireRoles } from "../guards/requireRoles";

export const homeworkResolver = {
  Query: {
    homeworks: async (_: any, __: any, ctx: GraphQLContext) => {
      requireAuth(ctx);
      return homeworkService.getAllHomeworks();
    },
    homework: async (_: any, args: { id: string }, ctx: GraphQLContext) => {
      requireAuth(ctx);
      return homeworkService.getHomework(args.id);
    },
  },

  Mutation: {
    createHomework: async (
      _: any,
      args: { input: HomeworkInput },
      ctx: GraphQLContext
    ) => {
      requireRoles(ctx, [UserRoles.TEACHER]);
      return homeworkService.createHomework({
        ...args.input,
        teacherId: ctx.user.id,
      });
    },

    updateHomework: async (
      _: any,
      args: { id: string; input: HomeworkInput },
      ctx: GraphQLContext
    ) => {
      requireRoles(ctx, [UserRoles.TEACHER]);
      return homeworkService.updateHomework(args.id, args.input);
    },

    deleteHomework: async (_: any, args: { id: string }, ctx: GraphQLContext) => {
      requireRoles(ctx, [UserRoles.TEACHER]);
      return homeworkService.deleteHomework(args.id);
    },
  },
};
