import { WaitFunction } from "../ReusableComponents/Function.cy";
import { loginApplication } from "../ReusableComponents/LoginApplication.cy";

describe("Recent Publication Data Functionality Check Using API", () => {
  it("Should check for publications made within 7 days", () => {
    loginApplication();
    WaitFunction();

    const userId = localStorage.getItem("userId");

    // Calculate the date 7 days ago
    const sevenDaysAgoPublication = new Date();
    sevenDaysAgoPublication.setDate(sevenDaysAgoPublication.getDate() - 7);

    cy.request(
      "GET",
      `http://localhost:8080/orguser/release/byuserId?userId=${userId}`
    ).then((response) => {
      expect(response.status).to.equal(200);

      if (
        response.body.publications &&
        Array.isArray(response.body.publications)
      ) {
        let RecentPublication = false;
        response.body.publications.forEach((publication) => {
          const publicationDate = new Date(publication.date);

          //  To Check if the publication date is within the last 7 days
          if (publicationDate >= sevenDaysAgoPublication) {
            expect(publication).to.have.property("title").that.is.a("string")
              .and.not.empty;
            expect(publication).to.have.property("author").that.is.a("string")
              .and.not.empty;

            RecentPublication = true;
          }
        });
        WaitFunction();
        WaitFunction();
        //To  Check if a recent publication was found within the last 7 days
        expect(RecentPublication).to.be.true;
        console.log("No publications found");
      } else {
        // Log a message if publications property is not found or is not an array
        cy.log("No publications found");
        console.log("No publications foundssss");
        WaitFunction();
        WaitFunction();
        WaitFunction();
        WaitFunction();
      }
    });
  });
});
