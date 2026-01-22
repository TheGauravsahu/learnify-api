import { z } from "zod";
import { objectIdSchema } from ".";
import { registerSchema } from "./auth.validators";

export const genderSchema = z.enum(["MALE", "FEMALE", "OTHER"]);
export const studentStatusSchema = z.enum([
  "ACTIVE",
  "INACTIVE",
  "TRANSFERRED",
  "PASSED_OUT",
]);

export const guardianSchema = z.object({
  name: z.string().min(2),
  relation: z.enum(["FATHER", "MOTHER", "GUARDIAN"]),
  phone: z.string().min(10),
  email: z.string().email().optional(),
  occupation: z.string().optional(),
});

export const createStudentSchema = z.object({
  register: registerSchema,
  class: objectIdSchema,
  rollNumber: z.number().int().positive(),

  admissionNumber: z.string().min(3),
  admissionDate: z.coerce.date(),
  academicYear: z.string(),

  section: z.string().optional(),

  gender: genderSchema,
  dateOfBirth: z.coerce.date().optional(),
  bloodGroup: z.string().optional(),

  guardian: guardianSchema,

  address: z.string().optional(),

  status: studentStatusSchema.optional(),

  isTransportOpted: z.boolean().optional(),
  hostelResident: z.boolean().optional(),
});

export const updateStudentSchema = createStudentSchema.partial();

export type CreateStudentInput = z.infer<typeof createStudentSchema>;
export type UpdateStudentInput = z.infer<typeof updateStudentSchema>;
