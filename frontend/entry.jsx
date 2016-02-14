var React = require('react');
var ReactDOM = require('react-dom');
var hashHistory = React.hashHistory;

var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;

var Form = require('./form.jsx');
var Footer = require('./footer.jsx');
var Tracking = require('./tracking.jsx');

var App = React.createClass({
	render: function () {
		return (
			<div>
				{this.props.children}
			</div>
		);
	}
});

var routes = (
	<Route path="/" history={hashHistory} component={App}>
		<IndexRoute component={Form}/>
		<Route path="tracking/:shipment" component={Tracking}/>
	</Route>
);

document.addEventListener("DOMContentLoaded", function () {
  ReactDOM.render(
		<Router>{routes}</Router>,
    document.getElementById('root')
  );
});
