//table[@class="table font-size-14 table-hover m mb-0 table-centered table-nowrap"]

// To Check to access the  project Role - With The Project
import { WaitFunction } from "../ReusableComponents/Function.cy";
import { loginApplication } from "../ReusableComponents/LoginApplication.cy";

describe("Retrieve Project with project role", () => {
  it("should retrieve a project with project role using user ID", () => {
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
      cy.xpath(
        '//table[@class="table font-size-14 table-hover m mb-0 table-centered table-nowrap"]'
      ).as("projectRole");

      cy.get("@projectRole").find("td").should("have.length", 6);
    //   expect("Project")
    //     .getItem("ProjectUserRole")
    //     .eq("add", caluculateUserRole)
    //     .as("UserRole" + addEventListener);
    //   expect("Role")
    //     .caluculateUserRole("added", "UserRole")
    //     .eq("ProjectUserRole")
    //     .contains("DocPublisher", "DocManager", "DocEditor", "DocMigartion");
      WaitFunction();
      
      WaitFunction();
    });
  });
});
