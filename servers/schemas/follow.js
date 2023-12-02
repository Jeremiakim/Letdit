const { GraphQLError } = require("graphql");
const { ObjectId } = require("mongodb");
const User = require("../models/user");
const Follow = require("../models/follow");

const typeDefs = `#graphql


    type Follow{
        _id: ID
        followingId: ID
        followerId: ID
        createdAt: String
        updatedAt:String
    }

    input CreateFollowing{
        followingId: ID
    }

    type Mutation {
        follow(input: CreateFollowing): ResponseFollow
    }
`;

const resolvers = {
  Mutation: {
    follow: async (_, args, contextValue) => {
      try {
        const { input } = args;
        const { userId } = await contextValue.doAuthentication();
        if (input.followingId.toString() === userId.toString()) {
          throw new GraphQLError("Cannot follow this account");
        }
        const data = await Follow.createFollow(input, userId);
        return {
          statusCode: 200,
          message: `Success to follow`,
          data: data,
        };
      } catch (error) {
        console.log(error);
      }
    },
  },
};

module.exports = {
  followTypeDefs: typeDefs,
  followsResolvers: resolvers,
};
