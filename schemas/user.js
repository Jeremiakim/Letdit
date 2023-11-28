const { GraphQLError } = require("graphql");
const { getDatabase } = require("../config/db");
const { ObjectId } = require("mongodb");
const User = require("../models/user");

const typeDefs = `#graphql
    type User{
        _id: ID
        name: String!
        username: String!
        password: String!
        email: String!
    }
    type UserWithName{
        name: String
    }


    input Register {
        name: String!
        username: String!
        password: String!
        email: String!
    }
    input Login {
        name: String!
        username: String!
        password: String!
        email: String!
    }

    type Query {
        users: ResponseUser
        login(input: Login): ResponseLogin
    }

    type Mutation {
        register(input: Register): ResponseRegister
    }

`;

const resolvers = {
  Query: {
    users: async () => {
      try {
        const user = await User.findAllUsers();
        return {
          statusCode: 200,
          message: `Successfully retrieved users data`,
          data: user,
        };
      } catch (error) {
        console.log(error);
      }
    },
    login: async () => {},
  },
  Mutation: {
    register: async (_, args) => {
      const { input } = args;
      const { name, username, password, email } = input;
      try {
        const data = await User.createUser(name, username, password, email);

        // console.log(user);
        return {
          statusCode: 200,
          message: `Successfully create new users`,
          data,
        };
      } catch (error) {
        console.log(error);
      }
    },
  },
};

module.exports = {
  userTypeDefs: typeDefs,
  usersResolvers: resolvers,
};
