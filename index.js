// this line imports GraphQLServer from graphql-yoga using deconstruction
const { GraphQLServer } = require('graphql-yoga');

/*
  This is the schema.
  There is a Query type.
  Inside query type we have hello which is like a function.
  Takes in a parameter of called name of type String.
  It returns a String.  The '!' means it is mandatory.
*/
const typeDefs = `
  type Query {
    hello(name: String): String!
  }
`

/*
  These are the resolvers.  Note that the shape is similar to schema.
  The Query property has a property of hello which is a function
  that takes in an argument called name through destructuring.
  It return a String that says Hello and name passed in or Hello World
  if no name is passed in.
*/
const resolvers = {
  Query: {
    hello: (_, { name }) => `Hello ${name || 'World'}`,
  },
}

// specify the typeDefs (schema) and resolvers for the server
const server = new GraphQLServer({ typeDefs, resolvers })

// start server and then console log a message after it starts
server.start(() => console.log('Server is running on localhost:4000'))
