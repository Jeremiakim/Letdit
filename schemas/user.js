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

    input Register {
        name: String!
        username: String!
        password: String!
        email: String!
    }

    type Query {
        users: ResponseUser
    }

    type Mutation {
        register(input: Register):  ResponseRegister
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
  },
  Mutation: {
    register: async (_, args) => {
      const { input } = args;
      const { name, username, password, email } = input;
      try {
        const database = getDatabase();
        const usersCollection = database.collection("Users");
        const register = await usersCollection.insertOne({
          name,
          username,
          password,
          email,
        });
        const user = await usersCollection.findOne({
          _id: new ObjectId(register.insertedId),
        });
        return {
          statusCode: 200,
          message: `Successfully create new users`,
          data: user,
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
