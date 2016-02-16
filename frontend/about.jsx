var React = require("react");
var browserHistory = require('react-router').browserHistory;
var Well = require('react-bootstrap').Well;
var Portrait = require('./portrait.jsx');


var About = React.createClass({

  getInitialState: function() {
    return {
      portraits: []
      }
  },

  componentDidMount: function() {
    this.setState({portraits: this.generatePortraitHTML()});
  },

  generatePortraitHTML: function () {
    var portraitHTMLEls = [],
        portraitDetails = this.portraitDetails();
    for (var i = 0; i < portraitDetails.length; i++) {
      var portrait = (
        <Portrait key={i} portraitDetails={portraitDetails[i]}/>
      );
      portraitHTMLEls.push(portrait);
    };
    return portraitHTMLEls;
  },

  portraitDetails: function() {
    var portraitDetails = [
      {
        "name": "Byron Sha",
        "role": "Software Engineer",
        "linkedin": "https://www.linkedin.com/in/byron-sha-71109272",
        "img": "byron.jpg"
      },
      {
        "name": "Daniel Eager",
        "role": "Software Engineer",
        "linkedin": "https://www.linkedin.com/in/danieleager93",
        "img": "daniel.jpg"
      },
      {
        "name": "Hank Fanchiu",
        "role": "Software Engineer",
        "linkedin": "https://www.linkedin.com/in/hankfanchiu",
        "img": "hank.jpg"
      },
      {
        "name": "Johnny Reis",
        "role": "Software Engineer",
        "linkedin": "https://www.linkedin.com/in/jjjreisss",
        "img": "johnny.jpg"
      },
      {
        "name": "Mack Siu",
        "role": "Software Engineer",
        "linkedin": "https://www.linkedin.com/in/macksiu",
        "img": "mack.jpg"
      },
    ];
    return portraitDetails;
  },

  render: function () {
    var portraits = this.state.portraits;
    return (
      <div className="about-page">
        <Well>
          <h4>About</h4>
          <p> Winner of DeveloperConference Hackathon 2016 Shippo Challenge! </p>
          <span> TrackMonkey is a mobile web-application which allows users to
          keep track of their packages across multiple shipping carriers. Users
          can also sign up for text alert notifications for package updates. </span>
        </Well>

        <Well>
          <h4>Team</h4>
          <div className="profile-pictures">
            {portraits}
          </div>
        </Well>
      </div>
    );
  }
});

module.exports = About;
