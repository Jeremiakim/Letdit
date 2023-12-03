const { GraphQLError } = require("graphql");
const Post = require("../models/post");
const redis = require("../config/redis");

const typeDefs = `#graphql
    type Posts{
        _id: ID
        content: String!
        tags: [String]
        imgUrl: String
        authorId: ID!
        comments: [Comments]
        likes: [Likes]
        createdAt: String
        updatedAt: String
    }

    type Comments{
        content: String!
        authorId: ID!
        createdAt: String 
        updatedAt: String
    }

    type Likes{
        authorId: ID!
        createdAt: String
        updatedAt: String
    }

    input AddPost {
        content: String!
        tags: [String]
        imgUrl: String
    }

    type Query {
      readAllPosts: ResponsePosts
      readOnePost(id: ID!): ResponsePost
    }
    
    type Mutation {
        addPost(input: AddPost):  ResponseAddpost
        comment(_id: ID, content:String!): ResponseComment
        like(_id: ID ): ResponseLike
    }

`;

const resolvers = {
  Query: {
    readAllPosts: async (_, args, context) => {
      const { userId } = await context.doAuthentication();
      const postCache = await redis.get("data:posts");
      if (postCache) {
        return {
          statusCode: 200,
          message: `Success to get all posts`,
          data: JSON.parse(postCache),
        };
      }
      const data = await Post.findAllPosts();
      await redis.set("data:posts", JSON.stringify(data));
      return {
        statusCode: 200,
        message: `Success to read all posts`,
        data,
      };
    },
    readOnePost: async (_, { id }, context) => {
      const { userId } = await context.doAuthentication();
      const data = await Post.findOnePosts(id);
      return {
        statusCode: 200,
        message: `Success to read post`,
        data,
      };
    },
  },
  Mutation: {
    addPost: async (_, { input }, context) => {
      const { userId } = await context.doAuthentication();
      const { content, tags, imgUrl } = input;
      try {
        const data = await Post.createPosts(content, tags, imgUrl, userId);
        await redis.del("data:posts");

        return {
          statusCode: 200,
          message: `Success to add post`,
        };
      } catch (error) {
        throw new GraphQLError("Failed TO Add Post");
      }
    },
    comment: async (_, args, context) => {
      const { _id, content } = args;
      try {
        if (!content) {
          throw new GraphQLError("You should be input something");
        }
        const { userId } = await context.doAuthentication();
        const data = await Post.createComments(userId, content, _id);

        return {
          statusCode: 200,
          message: `Success to comment`,
          data,
        };
      } catch (error) {
        throw new GraphQLError(error);
      }
    },
    like: async (_, args, context) => {
      // console.log(args);
      const { _id } = args;
      const { userId } = await context.doAuthentication();
      if (!userId.toString()) {
        throw new GraphQLError("Failed to like");
      }
      const data = await Post.createLikes(_id, userId);
      return {
        statusCode: 200,
        message: "Success to like",
        data,
      };
    },
  },
};

module.exports = {
  postTypeDefs: typeDefs,
  postResolvers: resolvers,
};
