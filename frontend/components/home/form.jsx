var React = require("react");
var LinkedStateMixin = require("react-addons-linked-state-mixin");
var browserHistory = require("react-router").browserHistory;
var Input = require("react-bootstrap").Input;
var ButtonInput = require("react-bootstrap").ButtonInput;
var Button = require("react-bootstrap").Button;
var Alert = require('react-bootstrap').Alert;
var Well = require("react-bootstrap").Well;
var detectCarrier = require("../../utils/detect_carrier");
var CarrierDropdown = require("./carrier_dropdown");
var VerifyPinModal = require("./verify_pin_modal");
var validPhoneNo = require("../../utils/valid_phone_number");

var Form = React.createClass({
	mixins: [LinkedStateMixin],

	getInitialState: function  () {
		return {
			carrier: "",
			trackingNo: "",
			phoneNo: "",
			receiveUpdates: true,
			modalOpen: false,
			packageId: "",
			pin: "",
			alertVisible: false,
			processingRequest: false
		};
	},

	setCarrier: function (carrier) {
		this.setState({ carrier: carrier });
	},

	handleSubmit: function (e) {
		e.preventDefault();
		this.setState({
			alertVisible: false,
		 	processingRequest: true
		});
		this.getTracking();
	},

	pushToMap: function () {
		var url = "/tracking/" + this.state.carrier + "___" + this.state.trackingNo;

		browserHistory.push(url);
	},

	getTracking: function () {
		var url = "https://api.goshippo.com/v1/tracks/" + this.state.carrier + "/" + this.state.trackingNo;

		$.ajax({
			url: url,
			type: 'GET',
			dataType: 'json',
			success: function (data) {
				if (this.isValidTracking(data)) {
					this.handleValidTracking();
				} else {
					this.alertInvalidTracking();
				}
			}.bind(this),
			error: function () {
				console.log("Shippo threw an error");
			}
		})
	},

	isValidTracking: function (data) {
		return data.tracking_status !== null;
	},

	alertInvalidTracking: function () {
		this.setState({alertVisible: true});
	},

	dismissAlert: function () {
		this.setState({ alertVisible: false });
	},

	handleValidTracking: function (data) {
		if (validPhoneNo(this.state.phoneNo)) {
			this.postPackageData();
		} else {
			this.pushToMap();
		}
	},

	postPackageData: function () {
		var packageData = {
			phone_number: this.state.phoneNo,
			tracking_number: this.state.trackingNo,
			carrier: this.state.carrier,
			alert_updates: this.state.receiveUpdates
		};

		$.ajax({
			url: 'packages',
			type: 'POST',
			dataType: 'json',
			data: {package: packageData},
			success: function (data) {
				this.setState({
					modalOpen: true,
					packageId: data.package_id
				});
			}.bind(this),
			error: function (data) {
				console.log("Failed");
			}
		});
	},

	toggleTracking: function () {
		this.setState({ tracking: !this.state.tracking });
	},

  closeModal: function() {
    this.setState({ modalOpen: false });
  },

	buttonText: function() {
		if (!this.state.processingRequest) {
			return this.submitText();
		} else {
			return "Processing Request";
		}
	},

	submitText: function () {
		if (this.state.phoneNo === "") {
			return "Find Package";
		} else {
			return "Find & Track Package";
		}
	},

	submitDisabled: function() {
		if (this.state.processingRequest) {
			return true;
		} else if (this.state.carrier === "") {
			return true;
		} else if (this.state.trackingNo === "") {
			return true;
		} else if (this.state.phoneNo === "") {
			return false;
		} else {
			return !validPhoneNo(this.state.phoneNo);
		}
	},


	handleTrackNumberChange: function () {
		var trackingNumber = this.refs.tracking.getValue();
		var carrier = detectCarrier(trackingNumber);

		this.setState({
			trackingNo: trackingNumber,
			carrier: carrier
		});
	},

	carrierDropdown: function () {
		return (
			<CarrierDropdown carrier={this.state.carrier}
				setCarrier={this.setCarrier} />
		);
	},

	alertBox: function() {
		if (this.state.alertVisible) {
			return (
				<Alert
					bsStyle="danger"
					onDismiss={this.dismissAlert}>
					<h4>Invalid tracking number or carrier.</h4>
				</Alert>
			)
		} else {
			return ("");
		}
	},

	render: function  () {
		return (
			<form onSubmit={this.handleSubmit}>
				<Input placeholder="Enter tracking number"
					type="text"
					ref="tracking"
					buttonAfter={this.carrierDropdown()}
					onChange={this.handleTrackNumberChange} />

				{this.alertBox()}

    		<Well>
					<h4>Get SMS Updates (optional)</h4>

    			<Input placeholder="Enter phone number"
          	type="text"
          	valueLink={this.linkState("phoneNo")}/>

					<Input type="checkbox"
	        	className="active"
	        	label="Keep me updated along the way"
	        	help="Leave this unchecked if you want to only be notified upon arrival"
	        	checkedLink={this.linkState("receiveUpdates")}/>
    		</Well>

        <ButtonInput type="submit" block
					bsStyle="primary"
					bsSize="large"
					value={this.buttonText()}
					disabled={this.submitDisabled()}/>

				<VerifyPinModal modalOpen={this.state.modalOpen}
					trackingNo={this.state.trackingNo}
					carrier={this.state.carrier}
					packageId={this.state.packageId}
					onSuccess={this.pushToMap}
					closeModal={this.closeModal} />
			</form>
		);
	}
});

module.exports = Form;
