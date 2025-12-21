import { UserRoles } from "../../models/user.model";
import { ClassInput, classService } from "../../services/class.service";
import { GraphQLContext } from "../context";
import { requireRoles } from "../guards/requireRoles";

export const classResolver = {
  Query: {
    classes: async (_: any, __: any, ctx: GraphQLContext) => {
      requireRoles(ctx, [UserRoles.ADMIN, UserRoles.TEACHER]);
      return classService.getAllClasses();
    },
    class: async (_: any, args: { id: string }, ctx: GraphQLContext) => {
      requireRoles(ctx, [UserRoles.ADMIN]);
      return classService.getClass(args.id);
    },
  },

  Mutation: {
    createClass: async (
      _: any,
      args: { input: ClassInput },
      ctx: GraphQLContext
    ) => {
      requireRoles(ctx, [UserRoles.ADMIN]);
      return classService.createClass(args.input);
    },

    updateClass: async (
      _: any,
      args: { id: string; input: ClassInput },
      ctx: GraphQLContext
    ) => {
      requireRoles(ctx, [UserRoles.ADMIN]);
      return classService.updateClass(args.id, args.input);
    },

    deleteClass: async (_: any, args: { id: string }, ctx: GraphQLContext) => {
      requireRoles(ctx, [UserRoles.ADMIN]);
      return classService.deleteClass(args.id);
    },
  },
};
