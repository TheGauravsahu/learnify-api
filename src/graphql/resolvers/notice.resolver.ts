import { UserRoles } from "../../models/user.model";
import { NoticeInput, noticeService } from "../../services/notice.service";
import { GraphQLContext } from "../context";
import { requireAuth } from "../guards/requireAuth";
import { requireRoles } from "../guards/requireRoles";

export const noticeResolver = {
  Query: {
    notices: async (_: any, __: any, ctx: GraphQLContext) => {
      requireAuth(ctx);
      return noticeService.getAllNotices();
    },
    notice: async (_: any, args: { id: string }, ctx: GraphQLContext) => {
      requireAuth(ctx);
      return noticeService.getNotice(args.id);
    },
  },

  Mutation: {
    createNotice: async (
      _: any,
      args: { input: NoticeInput },
      ctx: GraphQLContext
    ) => {
      requireRoles(ctx, [UserRoles.ADMIN]);
      return noticeService.createNotice({
        ...args.input,
        createdBy: ctx.user.id,
      });
    },

    updateNotice: async (
      _: any,
      args: { id: string; input: NoticeInput },
      ctx: GraphQLContext
    ) => {
      requireRoles(ctx, [UserRoles.ADMIN]);
      return noticeService.updateNotice(args.id, args.input);
    },

    deleteNotice: async (_: any, args: { id: string }, ctx: GraphQLContext) => {
      requireRoles(ctx, [UserRoles.ADMIN]);
      return noticeService.deleteNotice(args.id);
    },
  },
};
