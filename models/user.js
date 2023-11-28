const { ObjectId } = require("mongodb");
const { getDatabase } = require("../config/db");

class User {
  static collection() {
    const database = getDatabase();
    const usersCollection = database.collection("Users");

    return usersCollection;
  }

  static async findAllUsers() {
    const users = await this.collection().find({}).toArray();
    // console.log(users, 14);
    return users;
  }

  static async findOneUser(id) {
    const user = await this.collection().findOne({
      _id: new ObjectId(id),
    });

    return user;
  }
}

module.exports = User;
