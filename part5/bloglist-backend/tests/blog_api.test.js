const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
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
    const blogs = await helpers.blogsInDb();
    expect(blogs[0].id).toBeDefined();
  }, 10000);
});

describe("post http request", () => {
  beforeEach(async () => {
    let header;
    const user = {
      username: "root",
      password: "password",
    };

    const loginUser = await api.post("/api/login").send(user);

    header = { Authorization: `bearer ${loginUser.body_token}` };
  });
  test("creates a new blog post", async () => {
    const blogsAtStart = await helpers.blogsInDb();

    const newBlog = {
      title: "Java Script",
      author: "Kamila",
      url: "www.google.pl",
    };
    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const blogsAtEnd = await helpers.blogsInDb();
    const contents = blogsAtEnd.map((res) => res.title);

    expect(blogsAtEnd).toHaveLength(blogsAtStart.length + 1);
    expect(contents).toContain("Java Script");
  });

  test("return 401 when token is not provided", async () => {
    const newBlog = {
      title: "Add blog without token",
      author: "Kamila",
      url: "google.com",
      likes: 10,
    };

    await api.post("/api/blogs").send(newBlog).expect(401);
  }, 10000);
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
    const content = blogsAtEnd.pop().likes;
    expect(content).toBe(0);
  }, 10000);

  test("verify that if the title or url properties are missing from the request data", async () => {
    const blogsAtStart = await helpers.blogsInDb();
    const newBlog = {
      author: "Kamila",
      likes: 4,
    };

    await api.post("/api/blogs").send(newBlog).expect(400);

    const blogsAtEnd = await helpers.blogsInDb();
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length);
  }, 10000);
});

describe("delete http request", () => {
  test("success with status 204", async () => {
    const blogAtStart = await helpers.blogsInDb();
    const blogToDelete = blogAtStart[0];
    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

    const blogsAtEnd = await helpers.blogsInDb();

    expect(blogsAtEnd).toHaveLength(blogAtStart.length - 1);

    const contents = blogsAtEnd.map((blog) => blog.id);

    expect(contents).not.toContain(blogToDelete.id);
  }, 10000);
});

describe("put http request", () => {
  test("update item, success with status 200", async () => {
    const blogsAtStart = await helpers.blogsInDb();
    const foundBlogToUpdate = blogsAtStart[0];
    foundBlogToUpdate.likes = 60;
    await api
      .put(`/api/blogs/${foundBlogToUpdate.id}`)
      .send(foundBlogToUpdate)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const blogsAtEnd = await helpers.blogsInDb();

    const foundBlog = blogsAtEnd[0];

    expect(foundBlog.likes).toBe(60);
  }, 10000);
});

afterAll(async () => {
  await mongoose.connection.close();
});
