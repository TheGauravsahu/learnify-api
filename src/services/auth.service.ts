import { userModel, UserRoles } from "../models/user.model";
import { signAccessToken, signRefreshToken } from "../utils/jwt";
import { comparePassword, hashPassword } from "../utils/password";
import { sessionService } from "./session.service";

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

    const session = await sessionService.createSession({
      user: user._id,
      deviceId: crypto.randomUUID(),
      deviceInfo: "registration",
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    });
    const accessToken = signAccessToken({
      userId: user._id,
      role: user.role,
      sessionId: session._id,
    });
    const refreshToken = signRefreshToken({
      userId: user._id,
      role: user.role,
      sessionId: session._id,
    });
    session.refreshToken = refreshToken;
    await session.save();

    return { accessToken, refreshToken, user };
  }

  async loginUser(
    { email, password }: LoginInput,
    deviceInfo?: string,
    ipAddress?: string
  ) {
    const user = await userModel.findOne({ email });
    if (!user) {
      throw new Error("Invalid credentials.");
    }

    const isMatch = comparePassword(password, user.password);
    if (!isMatch) {
      throw new Error("Invalid credentials");
    }

    const session = await sessionService.createSession({
      user: user._id,
      deviceId: crypto.randomUUID(),
      ipAddress,
      deviceInfo,
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    });

    const accessToken = signAccessToken({
      userId: user._id,
      role: user.role,
      sessionId: session._id,
    });
    const refreshToken = signRefreshToken({
      userId: user._id,
      role: user.role,
      sessionId: session._id,
    });
    session.refreshToken = refreshToken;
    await session.save();

    return { accessToken, refreshToken, user };
  }

  async logoutUser(refreshToken: string) {
    await sessionService.terminateSessionByRefreshToken(refreshToken);
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

  async refreshToken(refreshToken: string) {
    const session = await sessionService.getSessionByRefreshToken(refreshToken);
    const newAccessToken = signAccessToken({
      userId: session.user._id,
      role: session.user.role,
      sessionId: session._id,
    });

    const newRefreshToken = signRefreshToken({
      userId: session.user._id,
      role: session.user.role,
      sessionId: session._id,
    });
    session.refreshToken = newRefreshToken;
    await session.save();

    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
      user: session.user,
    };
  }
}

export const authService = new AuthService();
