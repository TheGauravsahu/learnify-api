import {
  authService,
  LoginInput,
  RegisterInput,
} from "../../services/auth.service";

export const authResolver = {
  Mutation: {
    register: async (_: any, args: { input: RegisterInput }) => {
      return authService.registerUser(args.input);
    },
    login: async (_: any, args: { input: LoginInput }) => {
      return authService.loginUser(args.input);
    },
  },
};
