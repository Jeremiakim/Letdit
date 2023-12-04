const { ObjectId } = require("mongodb");
const { getDatabase } = require("../config/db");
const { hashPassword, compareHash } = require("../helpers/bcrypt");
const { GraphQLError } = require("graphql");
const { createToken } = require("../helpers/jwt");
class User {
  static collection() {
    const database = getDatabase();
    const usersCollection = database.collection("Users");

    return usersCollection;
  }

  static async findAllUsers() {
    const users = await this.collection().find({}).toArray();
    return users;
  }

  static async findOneByUsername(username) {
    const user = await this.collection().findOne({
      username,
    });
    if (!user) {
      throw new GraphQLError("User Not Found");
    }

    return user;
  }

  static async findOne(filterQuery = {}, hidePassword = false) {
    const options = {};

    if (hidePassword) {
      options.projection = {
        password: 0,
      };
    }

    const user = await this.collection().findOne(filterQuery, options);

    return user;
  }

  static async createUser(name, username, password, email) {
    try {
      const register = await this.collection().insertOne({
        name,
        username,
        password: hashPassword(password),
        email,
      });
      const user = await this.collection().findOne({
        _id: new ObjectId(register.insertedId),
      });
      return user;
    } catch (error) {
      console.log(error);
    }
  }
  static async findUserByUsername(username, password) {
    try {
      const user = await this.collection().findOne({ username });
      // console.log(user);
      // console.log(user.password, 61);
      if (!user && !compareHash(password, user.password)) {
        throw new GraphQLError("Invalid Email Or Password");
      }
      let payload = {
        id: user._id,
        email: user.email,
      };

      const token = createToken(payload);
      // console.log(token);
      return {
        token,
        userId: payload.id,
      };
    } catch (error) {
      throw new GraphQLError(error);
    }
  }
  static async findOneId(id) {
    try {
      const [user] = await this.collection()
        .aggregate([
          { $match: { _id: new ObjectId(id) } },
          {
            $lookup: {
              from: "Follows",
              localField: "_id",
              foreignField: "followingId",
              as: "followers",
            },
          },
          {
            $lookup: {
              from: "Follows",
              localField: "_id",
              foreignField: "followerId",
              as: "following",
            },
          },
          {
            $lookup: {
              from: "Users",
              localField: "followers.followingId",
              foreignField: "_id",
              as: "FollowerDetails",
            },
          },
          {
            $lookup: {
              from: "Users",
              localField: "following.followingId",
              foreignField: "_id",
              as: "FollowingDetails",
            },
          },
          {
            $project: {
              name: 1,
              username: 1,
              email: 1,
              followers: {
                $map: {
                  input: "$FollowerDetails",
                  as: "fd",
                  in: {
                    _id: "$$fd._id",
                    username: "$$fd.username",
                  },
                },
              },
              following: {
                $map: {
                  input: "$FollowingDetails",
                  as: "fd",
                  in: {
                    _id: "$$fd._id",
                    username: "$$fd.username",
                  },
                },
              },
            },
          },
        ])
        .toArray();
      // console.log(user, 79);
      return user;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = User;
