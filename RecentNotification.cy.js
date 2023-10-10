import { WaitFunction } from "../ReusableComponents/Function.cy";
import { loginApplication } from "../ReusableComponents/LoginApplication.cy";

describe("Notification Functionality  Tests ", () => {
  it(" Test Case 1] Should check recent notifications within 24 hours", () => {
    // Visit your application or navigate to the appropriate page
    cy.visit("http://localhost:8080/");
    loginApplication();
    WaitFunction();
    cy.xpath('//h5[text()=" Recent Notifications "]').contains("Notifications");

    // To check To  Get the current date and time
    const currentTime = new Date();

    //  To Check if the notifications are within the last 24 hours
    cy.xpath('//h5[text()=" Recent Notifications "]').each(($notification) => {
      WaitFunction();
      const RecentnotificationTimestampStr = $notification.data("timestamp");
      WaitFunction();
      if (isNaN(Date.parse(RecentnotificationTimestampStr))) {
        return;
      }
      WaitFunction();
      // To Check  Recent Notification timestamp should be extract the current time

      const notificationTimestamp = new Date(RecentnotificationTimestampStr);
      const twentyFourHoursAgo = new Date(currentTime - 24 * 60 * 60 * 1000); // 24 hours in milliseconds
      expect(notificationTimestamp).to.be.greaterThan(twentyFourHoursAgo);
      expect(notification).to.have.property("message").that.is.a("string").and
        .not.empty;
      expect(notification)
        .to.have.property("type")
        .that.is.a("string")
        .and.oneOf(["info", "warning", "error"]);
      expect(notification).to.have.property("date").that.is.a("string");
      WaitFunction();
    });
  });
});

describe("Notification Tests", () => {
  it("should filter recent notifications within 24 hours", () => {
    // Make an API request to retrieve notifications
    //
    cy.request(
      "GET",
      "http://localhost:8080/api/orguser/repo/24hrsCommitNotifications"
    ).then((response) => {
      // Check if the API response status is successful
      expect(response.status).to.equal(200);

      // Ensure that the response body is defined and has a notifications property
      if (response.body && Array.isArray(response.body.notifications)) {
        // Get the current time
        const currentTime = new Date();

        // Filter notifications for those within the last 24 hours
        const recentNotifications = response.body.notifications.filter(
          (notification) => {
            const notificationTimestamp = new Date(notification.timestamp);
            const twentyFourHoursAgo = new Date(
              currentTime - 24 * 60 * 60 * 1000
            );
            return notificationTimestamp > twentyFourHoursAgo;
          }
        );

        // Assertions for recent notifications
        expect(recentNotifications.length).to.be.greaterThan(0);
      } else {
        // Handle the case where notifications are not found or not in the expected format
        cy.log("No notifications found or invalid response structure");
        console.log("No notifications ");
        WaitFunction();
      }
    });
  });
});
