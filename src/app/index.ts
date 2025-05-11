import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";
import bodyParser from "body-parser";
import { resolvers, typeDefs } from "./api/graphql";

export async function initServer() {
    const app = express();

    app.use(bodyParser.json());

    const gqServer = new ApolloServer({
        typeDefs: typeDefs,
        resolvers: resolvers,
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

    app.post("/auth/login", (req, res) => {
        const auth = req.headers.authorization; 
        console.log("/auth/login");
        console.log(auth);
        const token = auth?.replace("Bearer ", "");
        res.status(200).json({
            authToken:
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30",
        });
    });

    return app;
}
