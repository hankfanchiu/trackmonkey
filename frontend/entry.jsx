var React = require('react');
var ReactDOM = require('react-dom');
var browserHistory = require('react-router').browserHistory;
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var IndexRoute = require('react-router').IndexRoute;

var Header = require('./header.jsx');
var Footer = require('./footer.jsx');
var Form = require('./form.jsx');
var Footer = require('./footer.jsx');
var Tracking = require('./tracking.jsx');

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
			<IndexRoute component={Form}/>
			<Route path="tracking/:shipment" component={Tracking}/>
		</Route>
	</Router>
);

document.addEventListener("DOMContentLoaded", function () {
  ReactDOM.render(router, document.getElementById('root'));
});
