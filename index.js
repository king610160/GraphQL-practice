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
    },
    Game: {
        reviews(parent){
            return db.reviews.filter((r) => r.game_id === parent.id)
        }
    },
    Author: {
        reviews(parent){
            return db.reviews.filter((r) => r.author_id === parent.id)
        }
    },
    Review: {
        // why cannot use filter here
        author(parent){
            return db.authors.find((a) => a.id === parent.author_id)
            // return db.authors.filter((a) => a.id === parent.author_id)[0] // this can, but need to further check
        },
        game(parent){
            return db.games.find((g) => g.id === parent.game_id)
        }
    },
    Mutation: {
        deleteGame(_,args){
            db.games = db.games.filter((g) => g.id !== args.id)
            return db.games
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