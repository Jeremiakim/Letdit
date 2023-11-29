const { GraphQLError } = require("graphql");
const { readPayload } = require("./jwt");
const User = require("../models/user");

const authentication = async (req) => {
  const { authorization } = req.headers;
  if (!authorization) {
    throw new GraphQLError("You are not authenticated", {
      extensions: {
        http: "401",
        code: "Unauthorized",
      },
    });
  }
  let token = authorization.split(" ")[1];
  const payload = readPayload(token);
  let user = await User.findOne({ email: payload.email }, true);
  if (!user) {
    throw new GraphQLError("You are not authenticated, please login first", {
      extensions: {
        http: "401",
        code: "Unauthorized",
      },
    });
  }
  return {
    userId: user._id,
    email: user.email,
  };
};

module.exports = authentication;
