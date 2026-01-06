import mongoose from "mongoose";
import { IUser } from "./user.model";

export interface ISession extends mongoose.Document {
  user: mongoose.Types.ObjectId;
  refreshToken: string;
  isRevoked: boolean;
  ipAddress: string;
  deviceId: string;
  deviceInfo: string;
  expiresAt: Date;
}

export interface ISessionWithUser extends mongoose.Document {
  user: IUser;
  refreshToken: string;
  isRevoked: boolean;
  ipAddress: string;
  deviceId: string;
  deviceInfo: string;
  expiresAt: Date;
}

const sessionSchema = new mongoose.Schema<ISession>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    refreshToken: {
      type: String,
      unique: true,
    },
    isRevoked: {
      type: Boolean,
      default: false,
    },
    deviceId: {
      type: String,
      required: true,
    },
    deviceInfo: {
      type: String,
      required: true,
    },
    ipAddress: String,
    expiresAt: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

export const sessionModel = mongoose.model<ISession>("sessions", sessionSchema);
