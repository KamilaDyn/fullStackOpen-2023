describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    const user = {
      name: "Kamila",
      username: "Kamila01",
      password: "test123",
    };
    cy.request("POST", `${Cypress.env("BACKEND")}/users`, user);

    cy.visit("http://localhost:3000");
  });

  it("Login form is shown", function () {
    cy.contains("login");
    cy.contains("username");
    cy.contains("password");
  });
  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.get("#username").type("Kamila01");
      cy.get("#password").type("test123");
      cy.get("#login").click();
      cy.contains("User Kamila01 is logged in");
    });

    it("fails with wrong credentials", function () {
      cy.get("#username").type("Anna");
      cy.get("#password").type("123");
      cy.get("#login").click();
      cy.get(".error").should("have.css", "color", "rgb(255, 0, 0)");
      cy.contains("Wrong username or password");
    });
  });
  describe("When logged in", function () {
    beforeEach(function () {
      cy.request("POST", `${Cypress.env("BACKEND")}/login`, {
        username: "Kamila01",
        password: "test123",
      }).then((response) => {
        localStorage.setItem(
          "loggedBlogAppUser",
          JSON.stringify(response.body)
        );

        cy.visit("http://localhost:3000");
      });
    });

    it("A blog can be created", function () {
      cy.contains("add blog").click();
      cy.get("#title").type("Cypress Testing");
      cy.get("#author").type("Kamila");
      cy.get("#url").type("google.com");
      cy.get("#create").click();
      cy.get(".notification").should("have.css", "color", "rgb(0, 128, 0)");
      cy.contains("Cypress Testing");
    });
    it("like a blog", function () {
      cy.contains("add blog").click();
      cy.get("#title").type("Cypress Testing");
      cy.get("#author").type("Kamila");
      cy.get("#url").type("google.com");
      cy.get("#create").click();
      cy.contains("Cypress Testing");
      cy.contains("view").click();
      cy.contains("like").click();
      cy.contains("likes:").parent().find("span").should("contain", "1");
    });
    it("user can delete own blog", function () {
      cy.contains("add blog").click();
      cy.get("#title").type("Cypress test delete");
      cy.get("#author").type("Kamila");
      cy.get("#url").type("google.com");
      cy.get("#create").click();
      cy.get("#notification").click();

      cy.contains("Cypress test delete");
      cy.contains("view").click();
      cy.get("#delete").click();
      cy.get("html").should("not.contain", "Cypress test delete");
    });
  });

  describe("other user logged", function () {
    beforeEach(function () {
      cy.request("POST", `${Cypress.env("BACKEND")}/login`, {
        username: "Kamila01",
        password: "test123",
      }).then((response) => {
        localStorage.setItem(
          "loggedBlogAppUser",
          JSON.stringify(response.body)
        );

        cy.visit("http://localhost:3000");
      });
      cy.addBlog({ title: "JavaScrip", author: "Kamila", url: "google.com" });
      cy.addBlog({ title: "Python", author: "Kamila", url: "google.com" });
      cy.addBlog({ title: "Node.js", author: "Kamila", url: "google.com" });
      cy.contains("logout").click();
      const user = {
        name: "Anna",
        username: "Anna01",
        password: "test123",
      };
      cy.request("POST", `${Cypress.env("BACKEND")}/users`, user);
      cy.request("POST", `${Cypress.env("BACKEND")}/login`, {
        username: "Anna01",
        password: "test123",
      }).then((response) => {
        localStorage.setItem(
          "loggedBlogAppUser",
          JSON.stringify(response.body)
        );

        cy.visit("http://localhost:3000");
      });
    });
    it("creator can see the delete button of a blog, not anyone else", function () {
      cy.contains("view").click();
      cy.get("#delete").should("not.exist");
    });
  });

  describe("blogs are ordered according to likes", function () {
    beforeEach(function () {
      cy.login({ username: "Kamila01", password: "test123" });
      cy.addBlog({
        title: "Blog with 15 likes",
        author: "Kamila",
        url: "google.com",
        likes: 15,
      });
      cy.addBlog({
        title: "Blog with 10 likes",
        author: "Kamila",
        url: "google.com",
        likes: 10,
      });
      cy.addBlog({
        title: "Blog with 1 like",
        author: "Kamila",
        url: "google.com",
        likes: 1,
      });
    });
    it("ordered likes", function () {
      cy.contains("Blog with 15 likes")
        .find("button")
        .should("contain", "view")
        .click();
      cy.contains("Blog with 15 likes")
        .parent()
        .find("span")
        .should("contain", "15");
      cy.contains("Blog with 10 likes")
        .find("button")
        .should("contain", "view")
        .click();
      cy.contains("Blog with 10 likes")
        .parent()
        .find("span")
        .should("contain", "10");
      cy.contains("Blog with 1 like")
        .find("button")
        .should("contain", "view")
        .click();
      cy.contains("Blog with 1 like")
        .parent()
        .find("span")
        .should("contain", "1");
    });
  });
});
