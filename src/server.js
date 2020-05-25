import "./env";
import { GraphQLServer } from "graphql-yoga";
import logger, { format } from "morgan";
import schema from "./schema";
import "./passport";
import { prisma } from "../generated/prisma-client";
import passport from "passport";
import { authenticateJwt } from "./passport";

const PORT = process.env.PORT || 4000;

const server = new GraphQLServer({
  schema,
  context: ({ request }) => ({ request }),
});

server.express.use(logger("dev"));
server.express.use(authenticateJwt);

server.start({ port: PORT }, () =>
  console.log(`Server running on port http://localhost:${PORT}`)
);
