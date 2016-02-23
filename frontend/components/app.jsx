var React = require("react");
var Header = require("./header");
var Footer = require("./footer");

var App = React.createClass({
	render: function () {
		return (
			<div>
				<Header />

				{this.props.children}

				<Footer />
			</div>
		);
	}
});

module.exports = App;
