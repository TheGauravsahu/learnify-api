import { userModel } from "../models/user.model";
import { signTokens } from "../utils/jwt";
import { comparePassword, hashPassword } from "../utils/password";
import { LoginInput, RegisterInput } from "../validators/auth.validators";
import { sessionService } from "./session.service";

class AuthService {
  async registerUser({ email, password, role }: RegisterInput) {
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      throw new Error("User already exists.");
    }
    const hashedPasword = await hashPassword(password);
    // create user and session
    const user = await userModel.create({
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

    const { accessToken, refreshToken } = signTokens({
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
    ipAddress?: string,
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

    const { accessToken, refreshToken } = signTokens({
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
    const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
      signTokens({
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

  async deleteUser(id: string) {
    await Promise.all([
      userModel.findByIdAndDelete(id),
      sessionService.terminateSessionByUserId(id),
    ]);
  }
}

export const authService = new AuthService();
