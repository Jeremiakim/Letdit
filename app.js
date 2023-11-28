require("dotenv").config();
const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const port = process.env.PORT || 3000;
const mongoConnection = require("./config/db");

const users = [
  {
    _id: 1,
    name: "Jeremia Kim Zu",
    username: "jkdlzu",
    password: "12345",
    email: "jer67@gmail.com",
  },
  {
    _id: 2,
    name: "Jerema Kim Zu",
    username: "jkdzu",
    password: "1234",
    email: "jer6@gmail.com",
  },
];

const userTypeDefs = `#graphql
  
  type User{
        _id: ID
        name: String!
        username: String!
        password: String!
        email: String!
  }

 input Register {
    name: String!
    username: String!
    password: String!
    email: String!
 }
  type Query {
    users: ResponseUser
  }

  #type Mutation {
   # register(input: Register):  ResponseRegister
  #}
`;

const usersResolvers = {
  Query: {
    users: () => {
      return {
        statusCode: 200,
        message: `Successfully retrieved users data`,
        data: users,
      };
    },
  },
  //   Mutation: {
  //     user: (_, args) => {
  //       // const {} = args
  //       console.log(args, 55);
  //     },
  //   },
};

const responseTypeDef = `#graphql
    interface Response {
        statusCode: Int!
        message: String
        error: String
    }

    type ResponseUser implements Response {
        statusCode: Int!
        message: String
        error: String
        data: [User]
  }
    type ResponseRegister implements Response {
        statusCode: Int!
        message: String
        error: String
        data: User
  }
`;

const server = new ApolloServer({
  typeDefs: [userTypeDefs, responseTypeDef],
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
