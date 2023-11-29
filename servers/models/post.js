const { ObjectId } = require("mongodb");
const { getDatabase } = require("../config/db");

class Post {
  static collection() {
    const database = getDatabase();
    const postsCollection = database.collection("Posts");

    return postsCollection;
  }
  static async createPosts(content, tags, imgUrl, userId) {
    try {
      const post = await this.collection().insertOne({
        content,
        tags,
        imgUrl,
        authorId: userId,
        comments: [],
        likes: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      const findpost = await this.collection().findOne({
        _id: new ObjectId(post.insertedId),
      });
      return findpost;
    } catch (error) {
      console.log(error);
    }
  }
  static async findAllPosts() {
    try {
      const post = await this.collection().find({}).toArray();
    } catch (error) {
      console.log(error);
    }
  }
  static async findOnePosts() {
    try {
      const post = await this.collection().findOne({});
    } catch (error) {
      console.log(error);
    }
  }
  static async createComments() {
    try {
    } catch (error) {
      console.log(error);
    }
  }
  static async createLikes() {
    try {
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = Post;
