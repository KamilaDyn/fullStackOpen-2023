import { useState } from "react";

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: "solid",
  borderWidth: "solid",
  marginBottom: 5,
};

const Blog = ({ blog, handleLikeChange, loggedUser, handleBlogDelete }) => {
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
        {user.username === loggedUser && (
          <button
            style={{ backgroundColor: "red" }}
            onClick={() => handleBlogDelete(blog)}
          >
            Remove
          </button>
        )}
      </div>
    </div>
  );
};

export default Blog;
