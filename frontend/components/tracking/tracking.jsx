var React = require("react");
var Map = require("./map");
var ProgressBar = require("./progress_bar");

var Tracking = React.createClass({
	getInitialState: function () {
		return { shipment: null };
	},

	componentDidMount: function() {
		var tracking = this.props.params.shipment.split("___");

		this.getShipmentData(tracking[0], tracking[1]);
	},

	getShipmentData: function (carrier, trackingNo) {
		var url = "https://api.goshippo.com/v1/tracks/";
		url += carrier + "/" + trackingNo;

		$.get(url, function(data){
			this.setState({ shipment: data });
		}.bind(this));
	},

	render: function () {
		if (!this.state.shipment) { return <main></main>; }

		var trackHistory = this.state.shipment.tracking_history || [];

		return (
			<main>
				<Map trackingHistory={trackHistory}/>
				<ProgressBar trackingHistory={trackHistory}/>
			</main>
		);
	}
});

module.exports = Tracking;
