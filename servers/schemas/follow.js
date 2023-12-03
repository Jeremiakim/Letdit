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
        if (!input.followingId) {
          throw new GraphQLError("Your not follow anyone");
        }
        const userDetail = await User.findOneId(userId);
        userDetail.following.forEach((id) => {
          if (input.followingId === id._id.toString()) {
            throw new GraphQLError("You have follow this accounts");
          }
        });
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
        throw new GraphQLError(error);
      }
    },
  },
};

module.exports = {
  followTypeDefs: typeDefs,
  followsResolvers: resolvers,
};
