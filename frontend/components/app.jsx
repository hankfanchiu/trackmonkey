var React = require("react");
var Header = require("./header");
var Footer = require("./footer");

var App = React.createClass({
	render: function () {
		return (
			<main>
				<Header />

				{this.props.children}

				<Footer />
			</main>
		);
	}
});

module.exports = App;
