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

		this.getShipmentData(carrier, shippingNo);
	},

	getShipmentData: function (carrier, shippingNo) {
		var url = "http://hackers-api.goshippo.com/v1/tracks/" + carrier + "/" + shippingNo + "/";

		$.get(url, function(data){
			this.setState({ shipment: data });
		}.bind(this));
	},

	contextTypes: {
    router: React.PropTypes.func.isRequired
  },

	redirectToHome: function () {
		this.context.router.push("/");
	},

	render: function () {
		if (!this.state.shipment) { return <p></p>; }

		return (
			<div>
				<h1 className="title" onClick={this.redirectToHome}>TRACKMONKEY</h1>
				<Map shipment={this.state.shipment}/>
				<ProgressBar shipment={this.state.shipment}/>
			</div>
		);
	}
});

module.exports = Tracking;
