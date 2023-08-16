const bcrypt = require("bcryptjs");
const usersRouter = require("express").Router();

const User = require("../models/user");

usersRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate("blogs", {
    title: 1,
    author: 1,
    url: 1,
  });
  response.json(users);
});

usersRouter.post("/", async (request, response) => {
  const { username, name, password } = request.body;
  const existingUser = await User.findOne({ username });

  if (password.length < 3) {
    return response
      .status(400)
      .send({ error: "password is too short min 3 characters length" });
  }

  if (username.length < 3) {
    return response
      .status(400)
      .send({ error: "username is too short, min 3 characters length" });
  }
  if (existingUser) {
    return response.status(400).json({ error: "username is already taken" });
  }
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash,
  });

  const saveUser = await user.save();
  response.status(201).json(saveUser);
});

module.exports = usersRouter;
