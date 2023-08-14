import Blog from "../components/Blog";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

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

test("checks that the blogs URL and number of likes are shown when the button is clicked", async () => {
  const blog = {
    title: "Blog Title",
    author: "Kamila",
    url: "google.pl",
    user: "Kamila",
    likes: 9,
  };

  const loggedUser = "Kamila";
  const handleLikeChange = () => null;
  const handleBlogDelete = () => null;

  const component = render(
    <Blog
      blog={blog}
      handleLikeChange={handleLikeChange}
      loggedUser={loggedUser}
      handleBlogDelete={handleBlogDelete}
    />
  );
  const user = userEvent.setup();
  const viewBtn = component.container.querySelector(".viewBtn");
  const blogContainer = component.container.querySelector(".blog");
  await user.click(viewBtn);

  expect(blogContainer).toHaveTextContent("google.pl");
  expect(blogContainer).toHaveTextContent(9);
});

test("like button is clicked twice, the event handler the component received as props is called twice", async () => {
  const blog = {
    title: "Blog Title",
    author: "Kamila",
    url: "google.pl",
    user: "Kamila",
    likes: 9,
  };

  const mockHandler = jest.fn();

  const loggedUser = "Kamila";
  const handleBlogDelete = () => null;

  const component = render(
    <Blog
      blog={blog}
      handleLikeChange={mockHandler}
      loggedUser={loggedUser}
      handleBlogDelete={handleBlogDelete}
    />
  );

  const viewBtn = component.container.querySelector(".viewBtn");

  fireEvent.click(viewBtn);

  const likeBtn = component.getByRole("button", { name: "like" });

  fireEvent.click(likeBtn);
  fireEvent.click(likeBtn);

  expect(mockHandler.mock.calls).toHaveLength(2);
});
