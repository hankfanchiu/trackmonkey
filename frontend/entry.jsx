var React = require("react");
var ReactDOM = require("react-dom");
var browserHistory = require("react-router").browserHistory;
var Router = require("react-router").Router;
var Route = require("react-router").Route;
var IndexRoute = require("react-router").IndexRoute;

var Header = require("./header");
var Footer = require("./footer");
var Home = require("./home");
var Footer = require("./footer");
var Tracking = require("./tracking");
var About = require("./about");

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

var router = (
	<Router history={browserHistory}>
		<Route path="/" component={App}>
			<IndexRoute component={Home}/>
			<Route path="tracking/:shipment" component={Tracking}/>
			<Route path="about" component={About}/>
		</Route>
	</Router>
);

document.addEventListener("DOMContentLoaded", function () {
  ReactDOM.render(router, document.getElementById("root"));
});
