import { Request } from "express";
import { verifyAccessToken } from "../utils/jwt";
import { sessionService } from "../services/session.service";

export interface GraphQLContext {
  user: {
    id: string;
    role: string;
    sessionId: string;
  } | null;
  ip: string;
  userAgent?: string;
}

export const createContext = async ({
  req,
}: {
  req: Request;
}): Promise<GraphQLContext> => {
  const ip = req.ip;
  const userAgent = req.headers["user-agent"];
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return { user: null, ip, userAgent };
  }

  const token = authHeader.startsWith("Bearer ")
    ? authHeader.slice(7)
    : authHeader;

  try {
    const decoded = verifyAccessToken(token) as {
      userId: string;
      role: string;
      sessionId: string;
    };
    const session = await sessionService.getSessionByIdAndUserId(
      decoded.sessionId,
      decoded.userId
    );
    if (!session) {
      return { user: null, ip, userAgent };
    }
    return {
      user: { id: decoded.userId, ...decoded },
      ip,
      userAgent,
    };
  } catch (error) {
    return {
      user: null,
      ip,
      userAgent,
    };
  }
};
