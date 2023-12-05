export const typeDefs = `#graphql
# int, float , string, boolean, ID
    type Game {
        # ! means required
        id: ID!
        title: String!
        platform: [String!]!
    }
    type Review {
        id: ID!
        rating: Int!
        content: String!
    }
    type Author {
        id: ID!
        name: String!
        verified: Boolean!
    }
    type Query {
        reviews: [Review]
        games: [Game]
        author: [Author]
    }