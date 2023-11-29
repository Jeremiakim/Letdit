const { GraphQLError } = require("graphql");
const Post = require("../models/post");

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

    #type Query {
    
    #}
    
    type Mutation {
        addPost(input: AddPost):  ResponseAddpost
    }

`;

const resolvers = {
  //   Query: {},
  Mutation: {
    addPost: async (_, { input }, context) => {
      const { userId } = await context.doAuthentication();
      const { content, tags, imgUrl } = input;
      try {
        const data = await Post.createPosts(content, tags, imgUrl, userId);
        console.log(data);

        return {
          statusCode: 200,
          message: `Success to add post`,
        };
      } catch (error) {
        throw new GraphQLError("Failed TO Add Post");
      }
    },
  },
};

module.exports = {
  postTypeDefs: typeDefs,
  postResolvers: resolvers,
};
