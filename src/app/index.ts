import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";
import bodyParser from "body-parser";

export async function initServer() {
    const app = express();

    app.use(bodyParser.json());

    const gqServer = new ApolloServer({
        typeDefs: `
            type Query {
                hello: String
                sayHelloToMe(name: String!):String
            }
        `,
        resolvers: {
            Query: {
                hello: () => "Hello from GraphQL",
                sayHelloToMe: (parent: any, { name }: { name: string }) => null,
            },
        },
    });

    await gqServer.start();

    app.use((req, res, next) => {
        if (!req.body && process.env.NODE_ENV !== "production") {
            req.body = {}; // adding body key with valid value
        }
        next();
    });

    // Specify the path where we'd like to mount our server
    app.use("/graphql", expressMiddleware(gqServer));

    return app;
}
