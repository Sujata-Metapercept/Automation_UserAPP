import { WaitFunction } from "../ReusableComponents/Function.cy";
import { loginApplication } from "../ReusableComponents/LoginApplication.cy";
describe("dashboard  UI Testing ", () => {
  it('Test Scenario 1] To check  Userr Interface for dashboard ".', () => {
    loginApplication();
    WaitFunction();
    // Test Case 1] To Check User Field Should  Be visible Which Contain Projects ,
    //Test Case 2]To Check Projects  with role Field  should be visible .
    //TestCase 3] To Check  "Recent Release Log" field should be visible Which Conain Recent Release log ,
    //Test Case 4]To Check  "Recent Notification" field should be visible Which Conain  "Recent Notification"
    cy.xpath('//h5[text()="Dashboard"]').contains("Dashboard");
    WaitFunction();
    cy.xpath('//h5[text()=" Projects "]').contains("Projects");
    WaitFunction();
    cy.xpath('//h5[text()="Roles "]').contains("Roles");
    WaitFunction();
    cy.xpath('//h5[text()=" Recent Notifications "] ').contains(
      "Recent Notification"
    );
    WaitFunction();

    // To check breadcrumbs naming conventions, and Menu Heighting functionality
    var highlighted = cy
      .xpath('(//span[text()="Dashboard"])[1]')
      .trigger("mouseover");
    console.log("highlighted", highlighted);
    WaitFunction();

    var Breadcrumbs = cy
      .xpath('(//span[text()="Dashboard"])[2]')
      .contains("Dashboard");
    console.log("Breadcrumbs", Breadcrumbs);

    // To check to fetch the data of project field
    var ProjectData = cy
      .xpath('(//div[@class="card-body border-top py-2 mb-3 card-body"])[1]')
      .invoke("val")
      .as("Projects")
      .then((ProjectData) => {
        cy.log(`Fetched field content: ${ProjectData}`);
      });

    // To check Project role according to Project

    var ProjectRole = cy
      .xpath('(//div[@class="card-body border-top py-2 mb-3 card-body"])[2]')
      .invoke("val")
      .as("ProjectsRole")
      .then((ProjectRoles) => {
        //
        cy.log(`Fetched field content: ${ProjectRoles}`);
      });
  });

 
});
