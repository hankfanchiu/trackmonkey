var React = require('react');
var ReactDOM = require('react-dom');
var hashHistory = require('react-router').hashHistory;
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var IndexRoute = require('react-router').IndexRoute;

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

var router = (
	<Router history={hashHistory}>
		<Route path="/" component={App}>
			<IndexRoute component={Form}/>
			<Route path="tracking/:shipment" component={Tracking}/>
		</Route>
	</Router>
);

document.addEventListener("DOMContentLoaded", function () {
  ReactDOM.render(router, document.getElementById('root'));
});
