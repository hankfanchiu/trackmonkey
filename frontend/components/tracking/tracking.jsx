var React = require('react');
var browserHistory = require('react-router').browserHistory;
var Map = require('./map.jsx');
var ProgressBar = require('./progress_bar.jsx');

var Tracking = React.createClass({
	getInitialState: function () {
		return { shipment: null };
	},

	componentDidMount: function() {
		var shipParams = this.props.params.shipment.split("___");
		var carrier = shipParams[0];
		var shippingNo = shipParams[1];

		this.getShipmentData(carrier, shippingNo);
	},

	getShipmentData: function (carrier, shippingNo) {
		var url = "http://hackers-api.goshippo.com/v1/tracks/" + carrier + "/" + shippingNo + "/";

		$.get(url, function(data){
			this.setState({ shipment: data });
		}.bind(this));
	},

	redirectToHome: function () {
		browserHistory.push("/");
	},

	render: function () {
		if (!this.state.shipment) { return <p></p>; }

		return (
			<section>
				<Map shipment={this.state.shipment}/>
				<ProgressBar shipment={this.state.shipment}/>
			</section>
		);
	}
});

module.exports = Tracking;
