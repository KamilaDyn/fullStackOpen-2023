const bcrypt = require("bcryptjs");
const User = require("../models/user");
const helpers = require("./test_helper");
const app = require("../app");
const supertest = require("supertest");
const mongoose = require("mongoose");

const api = supertest(app);

describe("when there is initially one user in db", () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("secret", 10);
    const user = new User({
      username: "root",
      passwordHash,
    });

    await user.save();
  });

  test("create user with username", async () => {
    const passwordHash = await bcrypt.hash("secret", 10);
    const usersAtStart = await helpers.usersInDb();

    const newUser = {
      username: "kami02",
      name: "Kamila",
      password: passwordHash,
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helpers.usersInDb();

    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const usernames = usersAtEnd.map((user) => user.username);
    expect(usernames).toContain(newUser.username);
  }, 10000);

  test("username length min 3", async () => {
    const usersAtStart = await helpers.usersInDb();
    const newUser = {
      username: "",
      name: "Kamila",
      password: "password",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);
    expect(result.body.error).toContain(
      "username is too short, min 3 characters length"
    );

    const usersAtEnd = await helpers.usersInDb();

    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  }, 10000);

  test("unique username", async () => {
    const usersAtStart = await helpers.usersInDb();
    const newUser = {
      username: "root",
      name: "Kamila",
      password: "password",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);
    const findUserName = await usersAtStart.find(
      (user) => user.username === newUser.username
    );
    expect(result.body.error).toContain("username is already taken");
    expect(findUserName.username).toContain(newUser.username);
  }, 10000);
});
afterAll(() => {
  mongoose.connection.close();
});
