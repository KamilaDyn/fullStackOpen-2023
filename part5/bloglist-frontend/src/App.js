import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import { getAll } from "./services/blogs";
import { login } from "./services/login";
import { removeToken, setToken } from "./storage";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import Taggable from "./components/Togglable";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [userData, setUserData] = useState({ username: "", password: "" });
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState(null);
  const [blogFormVisible, setBlogFormVisible] = useState(false);
  const toggleVisibility = () => {
    setBlogFormVisible((prevValue) => !prevValue);
  };
  const hideWhenVisible = { display: blogFormVisible ? "none" : "" };
  const showWhenVisible = { display: blogFormVisible ? "" : "none" };
  const handleChange = ({ target }) => {
    const { name, value } = target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await login(userData);
      setToken(user);
      setUser(user);
      setUserData({ username: "", password: "" });
    } catch (exception) {
      setNotification({ type: "error", text: "Wrong username or password" });
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    }
  };

  const getAllBlogs = async () => {
    const blogs = await getAll();
    setBlogs(blogs);
  };

  useEffect(() => {
    getAllBlogs();
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
    }
  }, []);

  return (
    <div>
      {!user ? (
        <>
          <h2> Log in to application</h2>
          <Notification
            notification={notification}
            setNotification={setNotification}
          />
          <LoginForm
            handleChange={handleChange}
            userData={userData}
            handleLogin={handleLogin}
          />
        </>
      ) : (
        <>
          <h2>blogs</h2>
          <Notification
            notification={notification}
            setNotification={setNotification}
          />
          <p>
            User {user.username} is logged in. You can{" "}
            <button
              onClick={() => {
                removeToken();
                setUser(null);
              }}
            >
              logout
            </button>
          </p>
          <Taggable buttonLabel="new note">
            <BlogForm
              refreshBlogs={getAllBlogs}
              setNotification={setNotification}
            />
          </Taggable>
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </>
      )}
    </div>
  );
};

export default App;
