const { GraphQLError, Token } = require("graphql");
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

    type Query {
        users: ResponseUser
        login(username:String!, password:String!): ResponseLogin
        user(id: ID!): ResponseUserById
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
    user: async (_, { id }) => {
      try {
        const user = await User.findOneUser(id);
        // console.log(user);
        return {
          statusCode: 200,
          message: `Successfully retrieved users data`,
          data: user,
        };
      } catch (error) {
        console.log(error);
      }
    },
    login: async (_, args) => {
      const { username, password } = args;
      try {
        const token = await User.findUserByUsername(username, password);
        return {
          statusCode: 501,
          message: "A token",
          data: {
            token,
          },
        };
      } catch (error) {
        throw new GraphQLError("Failed To Login");
      }
    },
  },
  Mutation: {
    register: async (_, args) => {
      const { input } = args;
      const { name, username, password, email } = input;
      try {
        const data = await User.createUser(name, username, password, email);
        return {
          statusCode: 200,
          message: `Successfully create new users`,
          data,
        };
      } catch (error) {
        throw new GraphQLError("Failed To Register");
      }
    },
  },
};

module.exports = {
  userTypeDefs: typeDefs,
  usersResolvers: resolvers,
};
