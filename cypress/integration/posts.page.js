/// <reference types="Cypress" />

beforeEach(() => {
  cy.intercept("GET", "https://jsonplaceholder.typicode.com/posts", {
    fixture: "./../../fixtures/posts.json",
  });
});

it("user click on odd button to show only odd posts", () => {
  cy.visit("/posts");
  cy.get("#oddAction").click();
  cy.get("#post_2").should("not.exist");
});

it("user add a post", () => {
  cy.visit("/posts");
  cy.get("#title").type("My post");
  cy.get("#content").type("My content");
  cy.get("#addButton").click();
  cy.contains("My post");
});

it("user update a post", () => {
  cy.visit("/posts");
  cy.get("#post_1").click();
  cy.get("#title").clear();
  cy.get("#title").type("My post mod");
  cy.get("#content").type("My content");
  cy.get("#updateButton").click();
  cy.contains("My post mod");
});

it("user delete a post", () => {
  cy.visit("/posts");
  cy.get("#post_1").click();
  cy.get("#deleteButton").click();
  cy.get("#post_1").should("not.exist");
});
