var React = require('react');
var browserHistory = require('react-router').browserHistory;

var Header = React.createClass({
	pushToHome: function () {
		browserHistory.push("/");
	},

	render: function () {
		return (
      <a onClick={this.pushToHome}>
        <h1 className="title">TRACKMONKEY</h1>
      </a>
		);
	}
});

module.exports = Header;
