require("dotenv").config();
const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const getTokenFrom = (request) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.startsWith("Bearer ")) {
    return authorization.replace("Bearer ", "");
  }
  return null;
};

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", {
    name: 1,
    username: 1,
  });
  response.json(blogs);
});

blogsRouter.post("/", async (request, response) => {
  const body = request.body;
  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET);

  if (!decodedToken.id) {
    return response.status(401).json({ error: "token invalid" });
  }

  const user = await User.findById(decodedToken.id);
  const blog = new Blog({ ...request.body, user: user._id });
  if (!blog.title || !blog.url) {
    response.status(400).end();
  } else {
    if (!blog.likes) {
      blog.likes = 0;
    }
    const savedBlog = await blog.save();
    response.status(201).json(savedBlog);
  }
});

blogsRouter.put("/:id", async (request, response) => {
  const { title, author, url, likes } = request.body;

  const blog = {
    title: title,
    author: author,
    url: url,
    likes: likes,
  };

  if (!blog.title || !blog.url) {
    response.status(400).end();
  } else {
    if (!blog.likes) {
      blog.likes = 0;
    }
    const updateBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
      new: true,
      runValidators: true,
      context: "query",
    });
    response.json(updateBlog);
  }
});

blogsRouter.delete("/:id", async (request, response) => {
  const findIdBlog = await Blog.findByIdAndRemove(request.params.id);
  if (findIdBlog) {
    response.status(204).end();
  } else {
    response.status(401).end();
  }
});

module.exports = blogsRouter;
