var React = require("react");
var browserHistory = require('react-router').browserHistory;
var Well = require('react-bootstrap').Well;
var Portrait = require('./portrait.jsx');

var portraits = [
  {
    name: "Byron Sha",
    role: "Software Engineer",
    linkedin: "https://www.linkedin.com/in/byron-sha-71109272",
    img: "byron.jpg"
  },
  {
    name: "Daniel Eager",
    role: "Software Engineer",
    linkedin: "https://www.linkedin.com/in/danieleager93",
    img: "daniel.jpg"
  },
  {
    name: "Hank Fanchiu",
    role: "Software Engineer",
    linkedin: "https://www.linkedin.com/in/hankfanchiu",
    img: "hank.jpg"
  },
  {
    name: "Johnny Reis",
    role: "Software Engineer",
    linkedin: "https://www.linkedin.com/in/jjjreisss",
    img: "johnny.jpg"
  },
  {
    name: "Mack Siu",
    role: "Software Engineer",
    linkedin: "https://www.linkedin.com/in/macksiu",
    img: "mack.jpg"
  },
];

var About = React.createClass({
  renderPortraits: function () {
    return portraits.map(function (portrait, idx) {
      return <Portrait key={idx} portrait={portrait}/>;
    });
  },

  render: function () {
    return (
      <div className="about-page">
        <Well>
          <h4>About</h4>

          <p>
            Winning project of the DeveloperWeek 2016 Hackathon (February 13-14) Shippo Tracking API Challenge!
          </p>

          <p>
            TrackMonkey is a mobile web application which allows users to keep track of their packages across multiple shipping carriers. Users can also register for text alert notifications for package updates.
          </p>
        </Well>

        <Well>
          <h4>Team</h4>

          <div className="profile-pictures">
            {this.renderPortraits()}
          </div>
        </Well>
      </div>
    );
  }
});

module.exports = About;
