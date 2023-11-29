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

    type ResponseAddpost implements Response {
        statusCode: Int!
        message: String
        error: String
    }
`;

module.exports = {
  responseTypeDefs: typeDefs,
};
