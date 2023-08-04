require("dotenv").config();

const PORT = process.env.PORT;
const MONGODB_URI = process.env.URL;

module.exports = {
  PORT,
  MONGODB_URI,
};
