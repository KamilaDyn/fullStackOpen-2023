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
});
