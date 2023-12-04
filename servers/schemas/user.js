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
    
    type UserDetail{
        _id: ID
        name:String
        username: String
        email: String
        followers:[FollowInfo]
        following:[FollowInfo]
    }
    
    type UserWithName{
        name: String
    }

    type FollowInfo{
        _id: ID 
        username: String
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
        user(username:String!): ResponseUsername
        followDetail(id:ID): ResponseUserUserDetail
    }

    type Mutation {
        register(input: Register): ResponseRegister
    }
`;

const resolvers = {
  Query: {
    users: async (_, args, context) => {
      const { userId } = await context.doAuthentication();
      try {
        const { userId } = await context.doAuthentication();
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
    user: async (_, { username }, context) => {
      const { userId } = await context.doAuthentication();
      try {
        if (!username) {
          throw new GraphQLError("Please input your searching");
        }
        const user = await User.findOneByUsername(username);
        return {
          statusCode: 200,
          message: `Successfully retrieved users data`,
          data: user,
        };
      } catch (error) {
        throw new GraphQLError(error);
      }
    },
    login: async (_, args) => {
      const { username, password } = args;
      try {
        const { token, userId } = await User.findUserByUsername(
          username,
          password
        );
        return {
          statusCode: 501,
          message: "A token",
          data: {
            token,
            userId,
          },
        };
      } catch (error) {
        console.log(error);
        throw new GraphQLError("Failed To Login");
      }
    },
    followDetail: async (_, args, contextValue) => {
      const { userId } = await contextValue.doAuthentication();
      const { id } = args;
      try {
        let data;
        if (id) {
          data = await User.findOneId(id);
        } else {
          data = await User.findOneId(userId);
        }
        return {
          statusCode: 200,
          message: `Successfully retrieved users data`,
          data,
        };
      } catch (error) {
        throw new GraphQLError(error);
      }
    },
  },
  Mutation: {
    register: async (_, args) => {
      const { input } = args;
      // console.log(input);
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
