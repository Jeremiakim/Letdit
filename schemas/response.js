const typeDefs = `#graphql
    interface Response {
        statusCode: Int!
        message: String
        error: String
    }
  type ResponseUser implements Response {
        statusCode: Int!
        message: String
        error: String
        data: [User]
  }
    type ResponseRegister implements Response {
        statusCode: Int!
        message: String
        error: String
        data: User
  }
`;

module.exports = {
  responseTypeDefs: typeDefs,
};
