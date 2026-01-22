import { z } from "zod";
import { registerSchema } from "./auth.validators";

export const createTeacherSchema = z.object({
  register: registerSchema,
  name: z.string().min(2, "Teacher name is required."),
  subjects: z.array(z.string().min(1)).min(1, "Subjects are required."),
  classes: z.array(z.string()).optional(),
  qualification: z.string().min(2, "Teeacher Qualification is Required."),
  experience: z.number().int().min(0),
  phone: z.string().optional(),
  address: z.string().optional(),
});

export const updateTeacherSchema = createTeacherSchema.partial();

export type CreateTeacherInput = z.infer<typeof createTeacherSchema>;
export type UpdateTeacherInput = z.infer<typeof updateTeacherSchema>;
