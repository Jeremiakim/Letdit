const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.SECRET_KEY || "apa-aja-boleh-lah";

const createToken = (payload) => jwt.sign(payload, SECRET_KEY);
const readPayload = (token) => jwt.verify(token, SECRET_KEY);

module.exports = {
  createToken,
  readPayload,
};
