const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const blog = require("../models/blog");
const helpers = require("../tests/test_helper");

const api = supertest(app);

describe("test for get blogs", () => {
  test("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  }, 10000);

  test("unique identifier property of the blog posts is named id", async () => {
    const blogs = await blog.find({});
    expect(blogs[0]._id).toBeDefined();
  }, 10000);
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("post http request", () => {
  test("creates a new blog post", async () => {
    const newBlog = {
      title: "JavaScript",
      author: "Kamila",
      url: "www.google.pl",
    };
    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const response = await api.get("/api/blogs");
    const contents = response.body.map((res) => res.title);

    expect(response.body).toHaveLength(helpers.initialBlogs.length + 1);
    expect(contents).toContain("JavaScript");
  });

  test("likes property is missing from the request", async () => {
    const newBlog = {
      title: "Node",
      author: "Kamila",
      url: "http://google.com",
    };
    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const blogsAtEnd = await helpers.blogsInDb();
    const content = blogsAtEnd.map((response) => response.likes);
    const likes = content.reduce(
      (count, num) => (num === 0 ? count + 1 : count),
      0
    );

    expect(likes).toBe(0);
  }, 1000);

  test("verify that if the title or url properties are missing from the request data", async () => {
    const newBlog = {
      author: "Kamila",
      likes: 4,
    };

    await api.post("/api/blogs").send(newBlog).expect(400);

    const blogsAtEnd = await helpers.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helpers.initialBlogs.length);
  }, 10000);
});
