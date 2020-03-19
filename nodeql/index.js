const http = require("http");
const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");
const { makeExecutableSchema } = require("graphql-tools");
const { ApolloServer, gql } = require("apollo-server-express");

// FEDERATION SPECIFIC
const { buildFederatedSchema } = require("@apollo/federation");

const PORT = 8001;

// Create Express application
const app = express();

// Apply CORS to the endpoints
app.use(cors({}));

// Add body parser
app.use(bodyParser.json());

// Add health endpoint for testing
app.get("/health", (req, res) => {
  res.send({ status: "UP" });
});

/* ---------- Resolvers ---------- */
const dogResolver = () => {
  return {
    id: 1,
    name: "Rex"
  };
};

const dogsResolver = () => {
  return [
    {
      id: 1,
      name: "Rex"
    },
    {
      id: 2,
      name: "Oscar"
    }
  ];
};

const addDogResolver = (root, { id, name }) => {
  console.log(id, name);
  return {
    id,
    name
  };
};

const ownerResolver = () => {
  throw new Error("Rex lost his owner!!!! Ahh!!!");
};

const ownerQueryResolver = () => {
  return {
    name: "Joe"
  };
};

const resolvers = {
  Query: {
    dog: dogResolver,
    dogs: dogsResolver,
    owner: ownerQueryResolver
  },
  Mutation: {
    addDog: addDogResolver
  },
  Dog: {
    owner: ownerResolver
  },
  Owner: {
    dogs: dogsResolver
  }
};

/* ---------- Schema Definition ---------- */

const typeDefs = gql`
  """
  A dog is an animal that we all know and love unconditionally!
  """
  type Dog {
    id: ID!
    "The name of the doggo."
    name: String!
    "Doggos owner!"
    owner: Owner
  }
  """
  Hooman that cares for a doggo
  """
  type Owner {
    name: String!
    dogs: [Dog!]
  }
  type Query {
    dog(id: ID!): Dog!
    dogs: [Dog!]
    owner(id: ID!): Owner!
  }
  type Mutation {
    addDog(id: ID!, name: String!): Dog!
  }
`;

// Note replaced one line of code

/*const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});*/

const schema = buildFederatedSchema([
  {
    typeDefs,
    resolvers
  }
]);

/* ---------- Apollo Server Creation ---------- */

const server = new ApolloServer({
  schema,
  context: ({ req, res }) => ({
    req,
    res
  })
});

server.applyMiddleware({ app, path: "/graphql", cors: {} });

/* ---------- Create the http server ---------- */

http.createServer(app).listen(PORT, () => {
  console.log("Http server is now running on port", PORT);
});
