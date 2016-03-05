var React = require("react");
var Map = require("./map");
var ProgressBar = require("./progress_bar");
var SubscribeForm = require("./subscribe_form");
var validPhoneNo = require("../../utils/valid_phone_number");

var Tracking = React.createClass({
	getInitialState: function () {
		return {
			shipment: null
		};
	},

	componentDidMount: function() {
		var trackingDetails = this.trackingDetails();

		this.getShipmentData(trackingDetails.carrier, trackingDetails.trackingNo);
	},

	trackingDetails: function() {
		var tracking = this.props.params.shipment.split("___");

		return ({
			carrier: tracking[0],
			trackingNo: tracking[1]
		})
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
				<SubscribeForm trackingDetails={this.trackingDetails()} />
				<ProgressBar trackingHistory={trackHistory}/>
			</main>
		);
	}
});

module.exports = Tracking;
