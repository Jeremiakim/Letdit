const { ObjectId } = require("mongodb");
const { getDatabase } = require("../config/db");
const { GraphQLError } = require("graphql");

class Follow {
  static collection() {
    const database = getDatabase();
    const followsCollection = database.collection("Follows");

    return followsCollection;
  }

  static async createFollow(input, userId) {
    try {
      const user = await this.collection().findOne({
        $and: [
          { followerId: new ObjectId(userId) },
          { followingId: new ObjectId(input.followingId) },
        ],
      });
      if (user) {
        throw new GraphQLError("You have follow this account");
      }

      const follow = await this.collection().insertOne({
        followingId: new ObjectId(input.followingId),
        followerId: userId,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const findUserFollowing = await this.collection().findOne({
        _id: new ObjectId(follow.insertedId),
      });
      return findUserFollowing;
    } catch (error) {
      throw new GraphQLError(error);
    }
  }
}

module.exports = Follow;
