var React = require("react");
var Route = require("react-router").Route;
var IndexRoute = require("react-router").IndexRoute;
var App = require("./components/app");
var Home = require("./components/home/home");
var Tracking = require("./components/tracking/tracking");
var About = require("./components/about/about");

var routes = (
	<Route path="/" component={App}>
		<IndexRoute component={Home}/>
		<Route path="tracking/:shipment" component={Tracking}/>
		<Route path="about" component={About}/>
	</Route>
);

module.exports = routes;
