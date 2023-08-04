const Blog = require("../models/blog");
const initialBlogs = [
  {
    title: "My blog",
    author: "Kamila",
    url: "www.google.pl",
  },
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

module.exports = {
  initialBlogs,
  blogsInDb,
};
