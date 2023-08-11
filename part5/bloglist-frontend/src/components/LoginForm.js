const LoginForm = ({ handleLogin, handleChange, userData }) => {
  return (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={userData.username}
          name="username"
          onChange={handleChange}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={userData.password}
          name="password"
          onChange={handleChange}
        />
      </div>
      <button type="submit">login</button>
    </form>
  );
};

export default LoginForm;
