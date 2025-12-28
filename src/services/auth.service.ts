import { userModel, UserRoles } from "../models/user.model";
import { signToken } from "../utils/jwt";
import { comparePassword, hashPassword } from "../utils/password";

export interface RegisterInput {
  name: string;
  email: string;
  password: string;
  role?: UserRoles;
  sendWelcomeEmail?: boolean;
}

export interface LoginInput {
  email: string;
  password: string;
}

class AuthService {
  async registerUser({ name, email, password, role }: RegisterInput) {
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      throw new Error("User already exists.");
    }

    const hashedPasword = await hashPassword(password);
    const user = await userModel.create({
      name,
      email,
      password: hashedPasword,
      role,
    });

    const token = signToken({ userId: user._id, role: user.role });

    return { token, user };
  }

  async loginUser({ email, password }: LoginInput) {
    const user = await userModel.findOne({ email });
    if (!user) {
      throw new Error("Invalid credentials.");
    }

    const isMatch = comparePassword(password, user.password);
    if (!isMatch) {
      throw new Error("Invalid credentials");
    }

    const token = signToken({ userId: user._id, role: user.role });
    return { token, user };
  }

  async updateUser(id: string, input: Partial<RegisterInput>) {
    try {
      const user = await userModel.findByIdAndUpdate(id, input, {
        new: true,
        runValidators: true,
      });
      if (!user) {
        throw new Error("User not found");
      }
      return user;
    } catch (err) {
      if (err.code === 11000) {
        throw new Error("Email already exists");
      }
      throw err;
    }
  }
}

export const authService = new AuthService();
