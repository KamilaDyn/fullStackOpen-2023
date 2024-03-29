const Blog = require("../models/blog");
const User = require("../models/user");
const initialBlogs = [
  {
    title: "JavaScript",
    author: "Kamila",
    url: "www.google.pl",
  },
];
const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((user) => user.toJSON());
};

module.exports = {
  initialBlogs,
  blogsInDb,
  usersInDb,
};
