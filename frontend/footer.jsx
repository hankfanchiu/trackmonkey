var React = require("react");
// var History = require("react-router").History;

var Footer = React.createClass({
  goToHome: function () {
    // this.history.pushState(null, "/");
    console.log("go home clicked")
  },

  render: function () {
    return (
      <footer className="footer-basic-centered">
        <p className="footer-company-motto">We track it for you.</p>

        <p className="footer-links">
            <a onClick={this.goToHome}>Home</a>
            ·
            <a href="https://github.com/hankfanchiu/package-tracker">Github</a>
            ·
            <a href="#">About</a>
            ·
            <a href="mailto:support@company.com">msiu23@gmail.com</a>
        </p>

        <p className="footer-company-name">Tracer &copy; 2016</p>
      </footer>
    );
  }
});

module.exports = Footer;
