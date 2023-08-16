import { useState } from "react";
import PropTypes from "prop-types";

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
    <div className="blog" style={blogStyle}>
      <div>
        {title} {author}{" "}
        <button className="viewBtn" onClick={toggleVisibility}>
          {!visible ? "view" : "hide"}
        </button>
      </div>
      <div style={showWhenVisible}>
        <a href={url}>{url}</a>
        <p>
          likes: <span>{likes} </span>
          <button name="like" onClick={() => handleLikeChange(blog)}>
            like
          </button>
        </p>
        {user && (
          <p>
            Added by: <span>{user.name}</span>
          </p>
        )}
        {user && user.username === loggedUser && (
          <button
            id="delete"
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

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  handleLikeChange: PropTypes.func.isRequired,
  loggedUser: PropTypes.string.isRequired,
  handleBlogDelete: PropTypes.func.isRequired,
};

export default Blog;
