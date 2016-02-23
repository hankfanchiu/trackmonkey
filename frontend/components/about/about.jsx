var React = require("react");
var Well = require("react-bootstrap").Well;
var Portrait = require("./portrait");
var trackMonkeyTeam = require("../../utils/trackmonkey_team");

var About = React.createClass({
  portraits: function () {
    return trackMonkeyTeam.map(function (portrait, idx) {
      return <Portrait key={idx} portrait={portrait}/>;
    });
  },

  render: function () {
    return (
      <main className="about-page">
        <Well>
          <h4>About</h4>

          <p>
            TrackMonkey is a mobile web application which allows users to keep track of their packages across multiple shipping carriers.
          </p>

          <p>
            Users can also register their phone numbers to receive SMS alert notifications for shipment tracking updates.
          </p>

          <p>
            Winner of the Shippo Tracking API Challenge at the DeveloperWeek 2016 Hackathon (February 13-14)!
          </p>
        </Well>

        <Well>
          <h4>Team</h4>

          <section className="profile-pictures">
            {this.portraits()}
          </section>
        </Well>
      </main>
    );
  }
});

module.exports = About;
