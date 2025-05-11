export const types = `#graphql
    type User {
        id: ID!
        firstName: String!
        lastname: String
        email: String!
        profileImageUrl: String
    }

    type verifyGoogleTokenResponse {
        token: String
    }
`;
