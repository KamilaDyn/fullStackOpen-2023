const setToken = (newToken) => {
  window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(newToken));
};

const removeToken = () => {
  window.localStorage.removeItem("loggedBlogAppUser");
};

const getToken = () => {
  const userToken = JSON.parse(
    window.localStorage.getItem("loggedBlogAppUser")
  );
  return `Bearer ${userToken.token}`;
};

export { setToken, removeToken, getToken };
