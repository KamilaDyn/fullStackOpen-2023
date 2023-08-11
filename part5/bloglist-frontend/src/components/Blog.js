import { useState } from "react";
import { updateBlog } from "../services/blogs";

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: "solid",
  borderWidth: "solid",
  marginBottom: 5,
};

const Blog = ({ blog, handleLikeChange }) => {
  const { title, author, likes, url, user } = blog;
  const [visible, setVisible] = useState(false);
  const toggleVisibility = () => {
    setVisible((prevValue) => !prevValue);
  };
  const showWhenVisible = { display: visible ? "" : "none" };

  return (
    <div style={blogStyle}>
      <div>
        {title} {author}{" "}
        <button onClick={toggleVisibility}>{!visible ? "view" : "hide"}</button>
      </div>
      <div style={showWhenVisible}>
        <a href={url}>{url}</a>
        <p>
          likes: <span>{likes} </span>
          <button onClick={() => handleLikeChange(blog)}>like</button>
        </p>
        <p>
          Added by: <span>{user.name}</span>
        </p>
      </div>
    </div>
  );
};

export default Blog;
