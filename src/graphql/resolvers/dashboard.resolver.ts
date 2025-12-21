import { UserRoles } from "../../models/user.model";
import { dashboardService } from "../../services/dashboard.service";
import { GraphQLContext } from "../context";
import { requireRoles } from "../guards/requireRoles";

export const dashboardResolver = {
  Query: {
    adminDashboard: async (_: any, __: any, ctx: GraphQLContext) => {
      requireRoles(ctx, [UserRoles.ADMIN]);
      return dashboardService.getAdminDashboard();
    },
    classWiseStudentCount: async (_: any, __: any, ctx: GraphQLContext) => {
      requireRoles(ctx, [UserRoles.ADMIN]);
      return dashboardService.getClassWiseStudentCount();
    },
  },
};
