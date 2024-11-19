import { startServerAndCreateNextHandler } from "@as-integrations/next";
import mercury, { Mercury } from "@mercury-js/core";
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
import resolvers from "./Search.Resolvers";
import { ApolloServerPluginLandingPageLocalDefault } from "@apollo/server/plugin/landingPage/default";
import logify from "@mercury-js/core/plugins/logify";
import razorPay from "@mercury-js/core/plugins/razorpay";
import media from "@mercury-js/core/plugins/media";

mercury.connect(process.env.DB_URL || "mongodb://localhost:27017/platform");

await mercury.package([
  // redisCache(),
  redisCache({
    client: {
      socket: { tls: true },
      url: process.env.REDIS_URL,
    },
  }),
  platform({
    plugins: [
      logify({
        JWT_EXPRIES_IN: process.env.NEXT_PUBLIC_JWT_EXPRIES_IN!,
        JWT_SECRET: process.env.NEXT_PUBLIC_JWT_SECRET!,
      }),
      ecommerce({
        options: {
          EMAIL_DOMAIN: process.env.EMAIL_DOMAIN,
          EMAIL_TEMPLATE: process.env.EMAIL_TEMPLATE,
          MSG_API_KEY: process.env.MSG_API_KEY,
          SENDER_EMAIL: process.env.SENDER_EMAIL,
          SENDER_NAME: process.env.SENDER_NAME,
          SMS_TEMPLATE: process.env.SMS_TEMPLATE
        },
        plugins: [
          media({
            CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
            CLOUDINARY_NAME: process.env.CLOUDINARY_NAME,
            CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
          }),
          razorPay({
            RAZOR_PAY_API_KEY: process.env.RAZOR_PAY_API_KEY!,
            RAZOR_PAY_SECRET_KEY: process.env.RAZOR_PAY_SECRET_KEY!,
          }),
        ],
      }),
    ],
  }),
]);
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
mercury.addGraphqlSchema(typeDefs, resolvers);
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
  introspection: true,
  plugins: [
    // ApolloServerPluginLandingPageGraphQLPlayground({
    //   settings: {
    //     'request.credentials': 'same-origin'
    //   }
    // })
    ApolloServerPluginLandingPageLocalDefault({ footer: false }),
  ],
});

// export const platformInitialize = (mercury: Mercury) => {
//   const newSchema = applyMiddleware(
//     makeExecutableSchema({
//       typeDefs: mercury.typeDefs,
//       resolvers: mercury.resolvers as unknown as IResolvers<
//         any,
//         GraphQLResolveInfo
//       >[],
//     })
//   );
//   // @ts-ignore
//   await server.setSchema({
//     schema: newSchema,
//   });
// }

mercury.hook.after("PLATFORM_INITIALIZE", async function (this: any) {
  const newSchema = applyMiddleware(
    makeExecutableSchema({
      typeDefs: mercury.typeDefs,
      resolvers: mercury.resolvers as unknown as IResolvers<
        any,
        GraphQLResolveInfo
      >[],
    })
  );
  // @ts-ignore
  await server.setSchema({
    schema: newSchema,
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
    };
  },
});

// export const mercuryInstance = mercury;

export async function GET(request: any) {
  return handler(request);
}

export async function POST(request: any) {
  return handler(request);
}
