import { User } from "./user";

export const typeDefs = `#graphql
    ${User.types}
    type Query {
        ${User.queries}
    }
`;

export const resolvers = {
    Query: {
        ...User.resolvers.queries,
    },
};
