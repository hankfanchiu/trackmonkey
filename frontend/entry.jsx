var React = require("react");
var ReactDOM = require("react-dom");
var browserHistory = require("react-router").browserHistory;
var Router = require("react-router").Router;
var routes = require("./routes");

document.addEventListener("DOMContentLoaded", function () {
  ReactDOM.render(
		<Router history={browserHistory}>{routes}</Router>, document.getElementById("root")
	);
});
