import { UserRoles } from "../../models/user.model";
import { GraphQLContext } from "../context";
import { requireAuth } from "./requireAuth";
import { GraphQLError } from "graphql";

export const requireRoles = (ctx: GraphQLContext, roles: UserRoles[]) => {
  requireAuth(ctx);

  if (!roles.includes(ctx.user.role as UserRoles)) {
    throw new GraphQLError("Not authorized", {
      extensions: {
        code: "FORBIDDEN",
        http: { status: 403 },
      },
    });
  }
};
