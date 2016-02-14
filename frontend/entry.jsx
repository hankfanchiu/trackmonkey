var React = require('react'),
	ReactDOM = require('react-dom')
	hashHistory = React.hashHistory;

var ReactRouter = require('react-router'),
	Router = ReactRouter.Router,
	Route = ReactRouter.Route,
	IndexRoute = ReactRouter.IndexRoute;

var Form = require('./form.jsx'),
	Footer = require('./footer.jsx'),
	Tracking = require('./tracking.jsx');


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
		
