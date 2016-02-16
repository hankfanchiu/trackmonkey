var React = require("react");
var browserHistory = require("react-router").browserHistory;

var Footer = React.createClass({
  pushToHome: function () {
    browserHistory.push("/");
  },

  pushToAbout: function () {
    browserHistory.push("/about");
  },

  render: function () {
    return (
      <footer className="footer">
        <p className="footer-links">
            <a onClick={this.pushToHome}>Home</a>
            |
            <a onClick={this.pushToAbout}>About</a>
            |
            <a href="https://github.com/hankfanchiu/trackmonkey"
              target="_blank">GitHub</a>
            |
            <a href="https://twitter.com/goshippo/status/699044208267517952"
              target="_blank">News</a>
        </p>

        <p className="footer-company-name">TrackMonkey &copy; 2016</p>
      </footer>
    );
  }
});

module.exports = Footer;
