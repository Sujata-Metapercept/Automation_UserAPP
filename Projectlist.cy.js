import { WaitFunction } from "../ReusableComponents/Function.cy";
import { loginApplication } from "../ReusableComponents/LoginApplication.cy";

describe("Retrieve Project", () => {
  it("should retrieve a project using user ID", () => {
    // Visit the website

    loginApplication();
    WaitFunction();
    const userId = localStorage.getItem("userId");
    cy.request({
      method: "GET",
      url: " http://localhost:8080//api/projectuser/byuserid",

      qs: {
        userId: userId,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);

      //  expect(project).to.have("string");
      WaitFunction();

      //

      // To check The assetion Supposed Project name is "flowers-demo"

      cy.log("To check Assertion- Should able to View Project Name ");
      cy.xpath('//h5[text()="flowers-demo"]').contains("flowers-demo");
      WaitFunction();
      WaitFunction();
      cy.xpath('//table[@class="table table-hover font-size-14 mb-0"]').as(
        "projectTable"
      );

      cy.get("@projectTable")
        .find("tr") // Assuming rows are represented by <tr> elements
        .should("have.length", 6);
      // Assuming each project is represented by a list item with a class of ".project-item"

      WaitFunction();
      WaitFunction();
      WaitFunction();

      WaitFunction();
    });
  });
});
