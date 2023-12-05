import { ApolloServer } from "@apollo/server"
import { startStandaloneServer } from '@apollo/server/standalone'
import { typeDefs } from './schema'
let PORT = 4000

// server setup
const server = new ApolloServer({
    // typeDefs -- definition of types of data
    typeDefs
    // resolvers
})

const { url } = await startStandaloneServer(server, {
    listen: { port: PORT }
})

console.log(`Server is ready on Port ${PORT}`)