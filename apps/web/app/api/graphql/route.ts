import { startServerAndCreateNextHandler } from "@as-integrations/next";
import mercury from "@mercury-js/core";
import redisCache from "@mercury-js/core/packages/redisCache";
import platform from "@mercury-js/core/packages/platform";
import { ApolloServer } from "@apollo/server";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { applyMiddleware } from "graphql-middleware";
import { IResolvers } from "@graphql-tools/utils";
import { GraphQLResolveInfo } from "graphql";
// import graphqlFields from "graphql-fields";
import { isEmpty } from "lodash";
// import "./cache";
import "./models";
import "./profiles";
// import "./hooks";
import typeDefs from "./schema";
import resolvers from './Search.Resolvers'

mercury.connect(process.env.DB_URL || "mongodb://localhost:27017/platform");

mercury.package([redisCache({ url: process.env.KV_URL }), platform()]);

mercury.addGraphqlSchema(
  typeDefs,
  resolvers
);

const composePopulateQuery = (fields: any, deep: number, max: number): any => {
  deep++;
  console.log("deep", deep);
  if (deep >= max) {
    return [];
  }
  return Object.keys(fields)
    .map((key) => {
      if (!isEmpty(fields[key])) {
        return {
          path: key,
          select: Object.keys(fields[key]),
          populate: composePopulateQuery(fields[key], deep, max),
        };
      }
    })
    .filter((item) => item != null);
};

const schema = applyMiddleware(
  makeExecutableSchema({
    typeDefs: mercury.typeDefs,
    resolvers: mercury.resolvers as unknown as IResolvers<
      any,
      GraphQLResolveInfo
    >[],
  })
);

let server = new ApolloServer({
  schema,
  // cors: corsOptions
});

mercury.hook.after("PLATFORM_INITIALIZE", async function (this: any) {
  console.log("PLATFORM_INITIALIZE");
  const newSchema = applyMiddleware(
    makeExecutableSchema({
      typeDefs: mercury.typeDefs,
      resolvers: mercury.resolvers as unknown as IResolvers<
        any,
        GraphQLResolveInfo
      >[],
    })
  )
  // @ts-ignore
  await server.setSchema({
    schema: newSchema
  });
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

export const mercuryInstance = mercury;

export async function GET(request: any) {
  return handler(request);
}

export async function POST(request: any) {
  return handler(request);
}