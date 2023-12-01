const { ObjectId } = require("mongodb");
const { getDatabase } = require("../config/db");
const { hashPassword } = require("../helpers/bcrypt");
const { GraphQLError } = require("graphql");
const { createToken } = require("../helpers/jwt");

class Follow {
  static collection() {
    const database = getDatabase();
    const followsCollection = database.collection("Follows");

    return followsCollection;
  }

  static async createFollow(input, userId) {
    try {
      const follow = await this.collection().insertOne({
        followingId: input.followingId,
        followerId: userId,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const findUserFollowing = await this.collection().findOne({
        _id: new ObjectId(follow.insertedId),
      });
      // console.log(findUserFollowing);
      return findUserFollowing;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = Follow;
