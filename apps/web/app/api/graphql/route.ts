import { startServerAndCreateNextHandler } from "@as-integrations/next";
import mercury from "@mercury-js/core";
import redisCache from "@mercury-js/core/packages/redisCache";
import platform from "@mercury-js/core/packages/platform";
import { ApolloServer } from "@apollo/server";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { applyMiddleware } from "graphql-middleware";
import "./models";
import "./profiles";
// import "./hooks";
import typeDefs from "./schema";
import resolvers from "./Search.Resolvers";

mercury.connect(process.env.DB_URL || "mongodb://localhost:27017/mercury");

mercury.package([redisCache(), platform()]);

mercury.addGraphqlSchema(typeDefs, resolvers);

const schema = applyMiddleware(
  makeExecutableSchema({
    typeDefs: mercury.typeDefs,
    resolvers: mercury.resolvers,
  })
);

const server = new ApolloServer({
  schema,
});

const handler = startServerAndCreateNextHandler(server, {
  context: async (req, res) => ({
    ...req,
    user: {
      id: "1",
      profile: "Admin",
    },
  }),
});

export async function GET(request: any) {
  return handler(request);
}

export async function POST(request: any) {
  return handler(request);
}
