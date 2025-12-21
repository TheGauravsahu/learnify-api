import { Request } from "express";
import { verifyToken } from "../utils/jwt";

export interface GraphQLContext {
  user: {
    id: string;
    role: string;
  } | null;
}

export const createContext = async ({
  req,
}: {
  req: Request;
}): Promise<GraphQLContext> => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return { user: null };
  }
  const token = authHeader.startsWith("Bearer ")
    ? authHeader.slice(7)
    : authHeader;

  try {
    const decoded = verifyToken(token) as {
      userId: string;
      role: string;
    };
    return {
      user: { id: decoded.userId, ...decoded },
    };
  } catch (error) {
    return { user: null };
  }
};
