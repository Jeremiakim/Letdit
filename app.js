const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");

const typeDefs = `#graphql
  
  type {

  }

 
  type Query {
  }
`;

const resolvers = {
  Query: {},
};
const server = new ApolloServer({});

(async () => {
  const { url } = await startStandaloneServer(server, {
    listen: { port: 3000 },
  });

  console.log(`🚀  Server ready at: ${url}`);
})();
