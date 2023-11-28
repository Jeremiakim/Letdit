const { ObjectId } = require("mongodb");
const { getDatabase } = require("../config/db");
const { hashPassword } = require("../helpers/bcrypt");

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

  static async createUser(name, username, password, email) {
    try {
      const register = await this.collection().insertOne({
        name,
        username,
        password: hashPassword(password),
        email,
      });
      const user = await this.findOneUser(register.insertedId);
      console.log(user);
      return user;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = User;
