var React = require("react");
var Form = require("./form");

var Home = React.createClass({
	render: function  () {
		return (
      <section>
				<figure className="monkey-logo">
					<img src="hanging-monkey.png"></img>
				</figure>
				<br/>

				<Form />
      </section>
		);
	}
});

module.exports = Home;
