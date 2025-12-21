import { GraphQLContext } from "../context";
import { GraphQLError } from "graphql";

export const requireAuth = (ctx: GraphQLContext) => {
  if (!ctx.user)
    throw new GraphQLError("Authentication required", {
      extensions: {
        code: "UNAUTHENTICATED",
        http: { status: 401 },
      },
    });
};
