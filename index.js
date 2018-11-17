// this line imports GraphQLServer from graphql-yoga using deconstruction
const { GraphQLServer } = require('graphql-yoga');
// imports mongoose library that let's you connect mongoDB to graphQL
const mongoose = require('mongoose');

// connects applicaton to mongodb and names the database 'test'
mongoose.connect("mongodb://localhost/test");

// Create the schema for mongoose, notice how it is name of
// property folllowed by the type
const todoSchema = mongoose.Schema({
  text: String,
  complete: Boolean
});

// a model the class used to create the Todo object
const Todo = mongoose.model("Todo", todoSchema);
/*
  This is the schema.
  There is a Query type.
  Inside query type we have hello which is like a function.
  Takes in a parameter of called name of type String.
  It returns a String.  The '!' means it is mandatory.

  Query is a read functionality
  Mutation is a write functionality
*/
const typeDefs = `
  type Query {
    hello(name: String): String!,
    todos: [Todo]
  }
  type Todo {
    id: ID!,
    text: String!,
    complete: Boolean!
  }
  type Mutation {
    createTodo(text: String!): Todo
  }
`

/*
  These are the resolvers.  Note that the shape is similar to schema.
  The Query property has a property of hello which is a function
  that takes in an argument called name through destructuring.
  It return a String that says Hello and name passed in or Hello World
  if no name is passed in.

  Note '_' represents the parent function that is passed
*/
const resolvers = {
  Query: {
    hello: (_, { name }) => `Hello ${name || 'World'}`,
    todos: () => Todo.find(),
  },
  Mutation: {
    createTodo: async (_, { text }) => {
      const todo = new Todo({ text, complete: false });
      await todo.save();
      return todo;
    }
  }
}

// specify the typeDefs (schema) and resolvers for the server
const server = new GraphQLServer({ typeDefs, resolvers })


const db = mongoose.connection;
// this is used to wait until the database is connected
// before starting the server
db.once("open", function () {
  // start server and then console log a message after it starts
  server.start(() => console.log('Server is running on localhost:4000'))
});
