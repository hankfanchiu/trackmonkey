var React = require('react');

var Map = React.createClass({
	render: function () {
		console.log("map");
		console.log(this.props);
		
		return (
			<div>
				<h3>map will go here</h3>
			</div>
		);
	}
});

module.exports = Map;
