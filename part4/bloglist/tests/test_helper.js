const Blog = require("../models/blog");
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

module.exports = {
  initialBlogs,
  blogsInDb,
};
