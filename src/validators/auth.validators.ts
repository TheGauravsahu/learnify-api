import { z } from "zod";
import { UserRoles } from "../models/user.model";

export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, "Password must be alteast of 6 characters long."),
  role: z.enum(UserRoles).default(UserRoles.STUDENT),
  sendWelcomeEmail: z.boolean().optional(),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, "Password must be alteast of 6 characters long."),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
