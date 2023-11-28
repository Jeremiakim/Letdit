require("dotenv").config();
const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const port = process.env.PORT || 3000;
const mongoConnection = require("./config/db");
const { userTypeDefs, usersResolvers } = require("./schemas/user");
const { responseTypeDefs } = require("./schemas/response");

const server = new ApolloServer({
  typeDefs: [userTypeDefs, responseTypeDefs],
  resolvers: [usersResolvers],
});

(async () => {
  try {
    await mongoConnection.connect();
    const { url } = await startStandaloneServer(server, {
      listen: { port },
    });

    console.log(`🚀  Server ready at: ${url}`);
  } catch (error) {
    console.log(error);
  }
})();
