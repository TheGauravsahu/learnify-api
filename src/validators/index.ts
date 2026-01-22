import mongoose from "mongoose";
import { z, ZodSchema } from "zod";

export const objectIdSchema = z
  .string()
  .refine((id) => mongoose.Types.ObjectId.isValid(id), {
    message: "Invalid ObjectId",
  });

export function validate<T>(schema: ZodSchema<T>, data: unknown): T {
  const result = schema.safeParse(data);

  if (!result.success) {
    throw new Error(
      result.error.issues
        .map((i) => `${i.path.join(".")}: ${i.message}`)
        .join(", "),
    );
  }

  return result.data;
}
