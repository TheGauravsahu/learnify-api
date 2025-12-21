import "dotenv/config";
import { ApolloServer } from "@apollo/server";
import env from "./config/env";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import express from "express";
import http from "http";
import cors from "cors";
import { expressMiddleware } from "@as-integrations/express5";
import { typeDefs, resolvers } from "./graphql/schema";
import { connectToDb } from "./config/db";
import { createContext } from "./graphql/context";

const app = express();
const httpServer = http.createServer(app);

async function startServer() {
  await connectToDb();
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  await server.start();

  app.use(
    "/graphql",
    cors<cors.CorsRequest>(),
    express.json(),
    expressMiddleware(server, {
      context: createContext,
    })
  );

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: env.PORT }, resolve)
  );

  console.log(`🚀 Server started at http://localhost:${env.PORT}/graphql`);
}

startServer();
