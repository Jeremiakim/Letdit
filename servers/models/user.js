const { ObjectId } = require("mongodb");
const { getDatabase } = require("../config/db");
const { hashPassword } = require("../helpers/bcrypt");
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
    // console.log(users, 14);
    return users;
  }

  static async findOneUser(id) {
    const user = await this.collection().findOne({
      _id: new ObjectId(id),
    });

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
      const user = await this.findOneUser(register.insertedId);
      return user;
    } catch (error) {
      console.log(error);
    }
  }
  static async findUserByUsername(username, password) {
    try {
      const user = await this.collection().findOne({ username });
      if (!user || user.password !== password) {
        throw new GraphQLError("Invalid Email Or Password");
      }

      let payload = {
        id: user._id,
        email: user.email,
      };

      const token = createToken(payload);
      return token;
    } catch (error) {
      throw new GraphQLError("Failed To Login");
    }
  }
}

module.exports = User;
