var React = require('react');

var Map = require('./map.jsx'),
	ProgressBar = require('./progress_bar.jsx')

var Tracking = React.createClass({
	getInitialState: function () {
		return {shipment: null };
	},

	componentDidMount: function() {
		shipParams = this.props.params.shipment.split("___")
		carrier = shipParams[0];
		shippingNo = shipParams[1];

		console.log("carrier= " + shipParams[0])
		console.log("number= " + shipParams[1])		

		this.getShipmentData(carrier, shippingNo);
	},

	getShipmentData: function (carrier, shippingNo) {
		url = "http://hackers-api.goshippo.com/v1/tracks/" + carrier  + "/" + shippingNo + "/";
		$.get(url, function(data){
			this.setState({ shipment: data })
		}.bind(this));
	},

	render: function () {
		if(!this.state.shipment) { return <p>loading</p>; }

		return (
			<div>
				<Map shipment={this.state.shipment}/>
				<ProgressBar shipment={this.state.shipment}/>
			</div>
		);
	}
});

module.exports = Tracking;