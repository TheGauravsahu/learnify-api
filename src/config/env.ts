export default {
  PORT: Number(process.env.PORT) || 3001,
  DB_URL: process.env.MONGODB_URL || "",
  JWT_SECRET: process.env.JWT_SECRET || "",
  ADMIN_FRONTEND_URL: process.env.ADMIN_FRONTEND_URL || "",
};
