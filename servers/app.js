require("dotenv").config();
const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const port = process.env.PORT || 3000;
const mongoConnection = require("./config/db");
const { userTypeDefs, usersResolvers } = require("./schemas/user");
const { responseTypeDefs } = require("./schemas/response");
const authentication = require("./helpers/AuthN");
const { postTypeDefs, postResolvers } = require("./schemas/post");
const { followTypeDefs, followsResolvers } = require("./schemas/follow");

const server = new ApolloServer({
  typeDefs: [userTypeDefs, responseTypeDefs, postTypeDefs, followTypeDefs],
  resolvers: [usersResolvers, postResolvers, followsResolvers],
});

(async () => {
  try {
    await mongoConnection.connect();
    const { url } = await startStandaloneServer(server, {
      listen: { port },
      context: async ({ req, res }) => {
        // console.log("Context get triggered");
        return {
          doAuthentication: async () => await authentication(req),
        };
      },
    });

    console.log(`🚀  Server ready at: ${url}`);
  } catch (error) {
    console.log(error);
  }
})();
