import {
  authService,
  LoginInput,
  RegisterInput,
} from "../../services/auth.service";
import { GraphQLContext } from "../context";

export const authResolver = {
  Mutation: {
    register: async (_: any, args: { input: RegisterInput }) => {
      return authService.registerUser(args.input);
    },
    login: async (_: any, args: { input: LoginInput }, ctx: GraphQLContext) => {
      return authService.loginUser(args.input, ctx.userAgent, ctx.ip);
    },
    logout: async (_: any, { refreshToken }: { refreshToken: string }) => {
      await authService.logoutUser(refreshToken);
      return true;
    },
  },
};
