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
      const posts = await this.collection().find({}).toArray();
      return posts;
    } catch (error) {
      console.log(error);
    }
  }
  static async findOnePosts(id) {
    try {
      const post = await this.collection().findOne({
        _id: new ObjectId(id),
      });
      return post;
    } catch (error) {
      console.log(error);
    }
  }
  static async createComments(userId, content, postId) {
    try {
      // MENDISTRUCK DAN MEMASUKAN NYA LANGSUNG/ MENGEPUSH LANGSUNG KE DALAM COMMENT YG DA DI POST
      const createComment = {
        content,
        authorId: userId,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      await this.collection().updateOne(
        { _id: new ObjectId(postId) },
        { $push: { comments: createComment } }
      );
      const updatedPost = await this.collection().findOne({
        _id: new ObjectId(postId),
      });
      return updatedPost;
    } catch (error) {
      console.log(error);
    }
  }
  static async createLikes(postId, userId) {
    try {
      const createLike = {
        authorId: userId,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      await this.collection().updateOne(
        { _id: new ObjectId(postId) },
        { $push: { likes: createLike } }
      );
      const updatedPost = await this.collection().findOne({
        _id: new ObjectId(postId),
      });
      return updatedPost;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = Post;
