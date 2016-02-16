var React = require("react");
var Link = require("react-router").Link;

var Header = React.createClass({
	render: function () {
		return (
      <Link to="/">
        <h1 className="title">TRACKMONKEY</h1>
      </Link>
		);
	}
});

module.exports = Header;
