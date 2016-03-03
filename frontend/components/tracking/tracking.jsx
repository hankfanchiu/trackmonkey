var React = require("react");
var Map = require("./map");
var ProgressBar = require("./progress_bar");
var Input = require("react-bootstrap").Input;
var ButtonInput = require("react-bootstrap").ButtonInput;
var validPhoneNo = require("../../utils/valid_phone_number");
var LinkedStateMixin = require("react-addons-linked-state-mixin");

var Tracking = React.createClass({
	mixins: [LinkedStateMixin],

	getInitialState: function () {
		return {
			shipment: null,
			phoneNo: ""
		};
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

	subscribeButton: function() {
		return (
			<ButtonInput
				disabled={!validPhoneNo(this.state.phoneNo)}>
				Subscribe
			</ButtonInput>
		)
	},

	render: function () {
		if (!this.state.shipment) { return <main></main>; }

		var trackHistory = this.state.shipment.tracking_history || [];

		return (
			<main>
				<Map trackingHistory={trackHistory}/>
				<form onSubmit={this.subscribe}>
					<Input
						placeholder="Enter phone number for SMS updates"
						type="text"
						valueLink={this.linkState("phoneNo")}
						buttonAfter={this.subscribeButton()}>
					</Input>
				</form>
				<ProgressBar trackingHistory={trackHistory}/>
			</main>
		);
	}
});

module.exports = Tracking;
