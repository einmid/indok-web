describe("SSO login", () => {
  it("should not prompt registration registered", () => {
    cy.log("Accessing site");
    cy.visit("/").then(() => {
      cy.getByTestId("hero-title").should(
        "contain.text",
        "Industriell Økonomi og Teknologiledelse"
      );
      cy.getByTestId("login")
        .click()
        .then(() => {
          cy.log("Logging in");
          cy.contains("Feide test users")
            .click()
            .then(() => {
              cy.get("[id=username]").type("eva_student");
              cy.get("[id=password]").type("5tgb");
            })
            .then(() => {
              cy.get("button").get("[type=submit]").click();
            });
        });
    });
    cy.getByTestId("profile-fullName").should(
      "contain.text",
      "Eva Student Åsen"
    );
    cy.log("Logged in");
  });
});