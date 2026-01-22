import mongoose from "mongoose";

export enum UserRoles {
  ADMIN = "ADMIN",
  TEACHER = "TEACHER",
  STUDENT = "STUDENT",
  PARENT = "PARENT",
}

export interface IUser extends mongoose.Document {
  email: string;
  password: string;
  role: UserRoles;
}

const userSchema = new mongoose.Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: Object.values(UserRoles),
      default: UserRoles.STUDENT,
    },
  },
  { timestamps: true }
);

export const userModel = mongoose.model<IUser>("users", userSchema)
