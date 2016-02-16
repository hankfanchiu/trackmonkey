var React = require("react");
var browserHistory = require('react-router').browserHistory;

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
            <a href="https://github.com/hankfanchiu/package-tracker" target="_blank">Github</a>
            |
            <a onClick={this.pushToAbout}>About</a>
            |
            <a href="mailto:fanchiu.hank@gmail.com">Contact</a>
        </p>

        <p className="footer-company-name">TrackMonkey &copy; 2016</p>
      </footer>
    );
  }
});

module.exports = Footer;
