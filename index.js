import pkg from 'graphql';
const { GraphQLError, versionInfo } = pkg;

import { ApolloServer } from "@apollo/server"
import { startStandaloneServer } from '@apollo/server/standalone'
import { typeDefs } from './schema.js'
import db from './_db.js'
let PORT = 4000


const resolvers = {
    Query: {
        games(){
            return db.games
        },
        authors(){
            return db.authors
        },
        reviews(){
            return db.reviews
        },
        // in single search has three parameter, (parent, args, content)
        review(_, args){
            return db.reviews.find((review) => review.id === args.id)
        },
        game(_, args){
            return db.games.find((game) => game.id === args.id)
        },
        author(_, args){
            return db.authors.find((author) => author.id === args.id)
        }
    }
}

// server setup
const server = new ApolloServer({
    // typeDefs -- definition of types of data
    // resolvers -- make the query can follow schema's rule to search data
    typeDefs,
    resolvers
})

const { url } = await startStandaloneServer(server, {
    listen: { port: PORT }
})

console.log(`Server is ready on Port ${PORT}`)