var React = require("react");
var Map = require("./map");
var ProgressBar = require("./progress_bar");

var Tracking = React.createClass({
	getInitialState: function () {
		return { shipment: null };
	},

	componentDidMount: function() {
		var shipParams = this.props.params.shipment.split("___");
		var carrier = shipParams[0];
		var trackingNo = shipParams[1];

		this.getShipmentData(carrier, trackingNo);
	},

	getShipmentData: function (carrier, trackingNo) {
		var url =
			"https://api.goshippo.com/v1/tracks/" + carrier + "/" + trackingNo;

		$.get(url, function(data){
			this.setState({ shipment: data });
		}.bind(this));
	},

	render: function () {
		if (!this.state.shipment) { return <main></main>; }

		return (
			<main>
				<Map shipment={this.state.shipment}/>

				<ProgressBar shipment={this.state.shipment}/>
			</main>
		);
	}
});

module.exports = Tracking;
