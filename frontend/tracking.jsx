var React = require('react');

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

		console.log("carrier= " + shipParams[0]);
		console.log("number= " + shipParams[1]);

		this.getShipmentData(carrier, shippingNo);
	},

	getShipmentData: function (carrier, shippingNo) {
		var url = "http://hackers-api.goshippo.com/v1/tracks/" + carrier  + "/" + shippingNo + "/";

		$.get(url, function(data){
			this.setState({ shipment: data });
		}.bind(this));
	},

	render: function () {
		if (!this.state.shipment) { return <p>loading</p>; }

		return (
			<div>
				<Map shipment={this.state.shipment}/>
				
				<ProgressBar shipment={this.state.shipment}/>
			</div>
		);
	}
});

module.exports = Tracking;
