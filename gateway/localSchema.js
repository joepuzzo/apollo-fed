const { buildFederatedSchema } = require("@apollo/federation");
const { gql } = require("apollo-server-express");

/* ---------- Resolvers ---------- */
const toyResolver = () => {
  return {
    id: 1,
    name: "Rope",
    brand: "Chewy"
  };
};

const resolvers = {
  Query: {
    toy: toyResolver
  },
  Mutation: {}
};

/* ---------- Schema Definition ---------- */

const typeDefs = gql`
  """
  A dog toy!!
  """
  type Toy {
    id: ID!
    name: String!
    brand: String!
  }
  type Query {
    toy(id: ID!): Toy!
  }
`;

const schema = buildFederatedSchema([
  {
    typeDefs,
    resolvers
  }
]);

module.exports = schema;
