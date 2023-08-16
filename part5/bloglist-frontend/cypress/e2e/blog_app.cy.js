describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    const user = {
      name: "Anna",
      username: "Anna02",
      password: "test123",
    };
    cy.request("POST", "http://localhost:3003/api/users/", user);

    cy.visit("http://localhost:3000");
  });

  it("Login form is shown", function () {
    cy.contains("login");
    cy.contains("username");
    cy.contains("password");
  });
  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.get("#username").type("Anna02");
      cy.get("#password").type("test123");
      cy.get("#login").click();
      cy.contains("User Anna02 is logged in");
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
      cy.request("POST", "http://localhost:3003/api/login", {
        username: "Anna02",
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
      cy.request("GET", "http://localhost:3003/api/blogs/");
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
});
