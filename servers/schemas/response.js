const typeDefs = `#graphql
    interface Response {
        statusCode: Int!
        message: String
        error: String
    }

    type LoginToken {
        token: String
    }

    type ResponseUser implements Response {
        statusCode: Int!
        message: String
        error: String
        data: [User]
    }

    type ResponseUserById implements Response {
        statusCode: Int!
        message: String
        error: String
        data: User
    }

    type ResponseRegister implements Response {
        statusCode: Int!
        message: String
        error: String
        data: UserWithName
    }
  
    type ResponseLogin implements Response {
        statusCode: Int!
        message: String
        error: String
        data: LoginToken
    }

    type ResponseFollow implements Response {
        statusCode: Int!
        message: String
        error: String
        data: Follow
    }

    type ResponsePosts implements Response {
        statusCode: Int!
        message: String
        error: String
        data: [Posts]
    }

    type ResponsePost implements Response {
        statusCode: Int!
        message: String
        error: String
        data: Posts
    }

    type ResponseAddpost implements Response {
        statusCode: Int!
        message: String
        error: String
    }

    type ResponseComment implements Response {
        statusCode: Int!
        message: String
        error: String
        data: Posts
    }

    type ResponseLike implements Response {
        statusCode: Int!
        message: String
        error: String
        data: Posts
    }

    type ResponseUserUserDetail implements Response {
        statusCode: Int!
        message: String
        error: String
        data: UserDetail
    }
`;

module.exports = {
  responseTypeDefs: typeDefs,
};
