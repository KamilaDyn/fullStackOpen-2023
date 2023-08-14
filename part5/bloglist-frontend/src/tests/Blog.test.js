import Blog from "../components/Blog";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";

test("render content with title and author", () => {
  const blog = {
    title: "Blog Title",
    author: "Kamila",
  };
  const handleLikeChange = () => null;
  const loggedUser = "";
  const handleBlogDelete = () => null;

  const component = render(
    <Blog
      blog={blog}
      handleLikeChange={handleLikeChange}
      loggedUser={loggedUser}
      handleBlogDelete={handleBlogDelete}
    />
  );
  const blogContainer = component.container.querySelector(".blog");
  expect(blogContainer).toHaveTextContent("Blog Title");
  expect(blogContainer).toHaveTextContent("Kamila");

  expect(blogContainer).not.toHaveTextContent("google.pl");
  expect(blogContainer).not.toHaveTextContent(9);
});
