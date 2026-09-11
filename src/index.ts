import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { buildSubgraphSchema } from '@apollo/subgraph';
import gql from 'graphql-tag';

const typeDefs = gql`
  extend schema @link(url: "https://specs.apollo.dev/federation/v2.0", import: ["@key"])
  type Product @key(fields: "id") {
    id: ID!
    name: String
    price: Float
  }
  type Query {
    product(id: ID!): Product
  }
`;

const resolvers = {
  Query: { product: (_, { id }) => ({ id, name: "Cloud Server", price: 49.99 }) },
  Product: { __resolveReference: (reference) => ({ ...reference, name: "Cloud Server" }) }
};

const server = new ApolloServer({ schema: buildSubgraphSchema({ typeDefs, resolvers }) });
startStandaloneServer(server, { listen: { port: 4001 } }).then(({ url }) => console.log(`Subgraph ready at ${url}`));
