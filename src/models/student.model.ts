import mongoose from "mongoose";

type StudentStatus = "ACTIVE" | "INACTIVE" | "TRANSFERRED" | "PASSED_OUT";
type GenderType = "MALE" | "FEMALE" | "OTHER";
type StudentGuardianRelation = "FATHER" | "MOTHER" | "GUARDIAN";

export interface IStudent extends mongoose.Document {
  user: mongoose.Types.ObjectId;
  class: mongoose.Types.ObjectId;
  rollNumber: number;

  admissionNumber: string;
  admissionDate: Date;
  academicYear: string;
  section?: string;

  gender: GenderType;
  dateOfBirth?: Date;
  bloodGroup?: string;

  guardian: {
    name: string;
    relation: StudentGuardianRelation;
    phone: string;
    email?: string;
    occupation?: string;
  };
  address?: string;
  status: StudentStatus;

  isTransportOpted?: boolean;
  hostelResident?: boolean;
}

const studentSchema = new mongoose.Schema<IStudent>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
      unique: true,
    },

    class: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "classes",
      required: true,
    },

    rollNumber: {
      type: Number,
      required: true,
    },

    admissionNumber: {
      type: String,
      required: true,
      unique: true,
    },

    admissionDate: {
      type: Date,
      required: true,
    },

    academicYear: {
      type: String,
      required: true,
    },

    section: String,

    gender: {
      type: String,
      enum: ["MALE", "FEMALE", "OTHER"],
      default: "MALE",
    },

    dateOfBirth: Date,
    bloodGroup: String,

    guardian: {
      name: { type: String, required: true },
      relation: {
        type: String,
        enum: ["FATHER", "MOTHER", "GUARDIAN"],
        required: true,
      },
      phone: { type: String, required: true },
      email: String,
      occupation: String,
    },

    address: String,

    status: {
      type: String,
      enum: ["ACTIVE", "INACTIVE", "TRANSFERRED", "PASSED_OUT"],
      default: "ACTIVE",
    },

    isTransportOpted: Boolean,
    hostelResident: Boolean,
  },
  { timestamps: true },
);

export const studentModel = mongoose.model<IStudent>("students", studentSchema);
