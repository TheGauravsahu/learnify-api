import {
  ISession,
  ISessionWithUser,
  sessionModel,
} from "../models/session.model";

class SessionService {
  private MAX_DEVICES = 2;

  async getAllSessions() {
    return await sessionModel.find().populate("user");
  }

  async getSessionById(sessionId: string) {
    return await sessionModel.findById(sessionId);
  }

  async getSessionByRefreshToken(
    refreshToken: string
  ): Promise<ISessionWithUser> {
    const session = await sessionModel
      .findOne({
        refreshToken,
        isRevoked: false,
        expiresAt: { $gt: new Date() },
      })
      .populate("user");

    if (!session) {
      throw new Error("Invalid refresh token");
    }
    return session as unknown as ISessionWithUser;
  }

  async getSessionByIdAndUserId(sessionId: string, userId: string) {
    return await sessionModel.findOne({
      _id: sessionId,
      user: userId,
      isRevoked: false,
      expiresAt: { $gt: new Date() },
    });
  }

  async getAllUserSessions(userId: string) {
    return await sessionModel
      .find({ user: userId, isRevoked: false })
      .populate("user");
  }

  async createSession(data: Partial<ISession>) {
    if (!data.user) throw new Error("User is required to create session.");

    const activeSessions = await sessionModel
      .find({
        user: data.user,
        isRevoked: false,
      })
      .sort({ createdAt: 1 });

    if (activeSessions.length >= this.MAX_DEVICES) {
      // revoke oldest session
      await sessionModel.updateOne(
        { _id: activeSessions[0]._id },
        { isRevoked: true }
      );
    }

    return await sessionModel.create(data);
  }

  async terminateSessionByRefreshToken(refreshToken: string) {
    return sessionModel.findOneAndUpdate(
      {
        refreshToken,
      },
      { isRevoked: true },
      { new: true }
    );
  }

  async terminateSessionByUserId(userId: string) {
    return sessionModel.updateOne({ user: userId }, { isRevoked: true });
  }

  async terminateAllUserSessions(userId: string) {
    return sessionModel.updateMany({ user: userId }, { isRevoked: true });
  }

  async updateSession(sessionId: string, data: Partial<ISession>) {
    return sessionModel.findByIdAndUpdate(sessionId, data, { new: true });
  }
}

export const sessionService = new SessionService();
