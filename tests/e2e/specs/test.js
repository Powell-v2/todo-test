// https://docs.cypress.io/api/introduction/api.html

describe("Smoke test", () => {
  it(`Survives few basic interactions`, () => {
    const todoTitle = "Feed cheetah";

    cy.visit(`/`);

    cy.get("[data-cy='undo_button']").should("be.disabled");

    cy.get("[data-cy='input_field']")
      .click()
      .type(todoTitle);
    cy.get("[data-cy='submit_button']").click();

    cy.get("[data-cy='undo_button']").should("not.be.disabled");

    cy.get("[data-cy='todo_list']")
      .contains("[data-cy='todo_item']", todoTitle)
      .get("[data-cy='todo_title']")
      .click();

    cy.contains(todoTitle);
    cy.get("[data-cy='link_to_home_page']").click();

    cy.get("[data-cy='remove_button']").click();

    cy.get("[data-cy='todo_item']").should("not.exist");
  });
});
