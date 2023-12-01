const { ObjectId } = require("mongodb");
const { getDatabase } = require("../config/db");

class Follow {
  static collection() {
    const database = getDatabase();
    const followsCollection = database.collection("Follows");

    return followsCollection;
  }

  static async createFollow(input, userId) {
    try {
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
      console.log(error);
    }
  }
}

module.exports = Follow;
