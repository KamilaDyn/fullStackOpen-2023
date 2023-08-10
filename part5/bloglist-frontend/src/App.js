import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import { getAll } from "./services/blogs";
import { login } from "./services/login";
import { removeToken, setToken } from "./storage";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState(null);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await login({
        username,
        password,
      });
      setToken(user);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setNotification({ type: "error", text: "Wrong username or password" });
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    }
  };

  const loginForm = () => {
    return (
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    );
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
          {loginForm()}
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
          <BlogForm
            refreshBlogs={getAllBlogs}
            setNotification={setNotification}
          />
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </>
      )}
    </div>
  );
};

export default App;
