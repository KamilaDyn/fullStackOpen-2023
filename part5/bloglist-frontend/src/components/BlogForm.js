import { useState } from "react";

const initialBlog = {
  title: "",
  author: "",
  url: "",
};
const BlogForm = ({ addBlog }) => {
  const [blogData, setBlogData] = useState(initialBlog);

  const { title, author, url } = blogData;
  const handleChange = (event) => {
    const { name, value } = event.target;
    setBlogData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addBlog(blogData);
      setBlogData(initialBlog);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        Title
        <input type="text" value={title} name="title" onChange={handleChange} />
      </div>
      <div>
        author
        <input
          type="text"
          value={author}
          name="author"
          onChange={handleChange}
        />
      </div>
      <div>
        url
        <input type="text" value={url} name="url" onChange={handleChange} />
      </div>
      <button type="submit">create</button>
    </form>
  );
};

export default BlogForm;
