import { startServerAndCreateNextHandler } from "@as-integrations/next";
import mercury from "@mercury-js/core";
import redisCache from "@mercury-js/core/packages/redisCache";
import platform from "@mercury-js/core/packages/platform";
import ecommerce from "@mercury-js/core/packages/ecommerce";
import { ApolloServer } from "@apollo/server";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { applyMiddleware } from "graphql-middleware";
import { IResolvers } from "@graphql-tools/utils";
import { GraphQLResolveInfo } from "graphql";
//@ts-ignore
import { isEmpty } from "lodash";
import typeDefs from "./schema";
import resolvers from './Search.Resolvers'
import { ApolloServerPluginLandingPageLocalDefault } from "@apollo/server/plugin/landingPage/default";
import logify from '@mercury-js/core/plugins/logify'

mercury.connect(process.env.DB_URL || "mongodb://localhost:27017/platform");

await mercury.package([redisCache(), platform({ plugins: [ecommerce()]})]);
// mercury.plugins([logify()])

// mercury.addGraphqlSchema(
//   typeDefs,
//   resolvers
// );



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
    typeDefs: [mercury.typeDefs, typeDefs],
    resolvers: [mercury.resolvers, resolvers] as unknown as IResolvers<
      any,
      GraphQLResolveInfo
    >[],
  })
);

let server = new ApolloServer({
  schema,
  introspection: true,
  plugins: [
    // ApolloServerPluginLandingPageGraphQLPlayground({
    //   settings: {
    //     'request.credentials': 'same-origin'
    //   }
    // })
    ApolloServerPluginLandingPageLocalDefault({ footer: false })
  ],
});

mercury.hook.after("PLATFORM_INITIALIZE", async function (this: any) {
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
  context: async (req: any, res) => {
    return {
      ...req,
      user: {
        id: "1",
        profile: "SystemAdmin",
      },
    }
  }
});

// export const mercuryInstance = mercury;

export async function GET(request: any) {
  return handler(request);
}

export async function POST(request: any) {
  return handler(request);
}