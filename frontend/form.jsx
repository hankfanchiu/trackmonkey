var React = require("react");
var LinkedStateMixin = require("react-addons-linked-state-mixin");
var browserHistory = require("react-router").browserHistory;
var Input = require("react-bootstrap").Input;
var ButtonInput = require("react-bootstrap").ButtonInput;
var DropdownButton = require("react-bootstrap").DropdownButton;
var MenuItem = require("react-bootstrap").MenuItem;
var Well = require("react-bootstrap").Well;
var Button = require("react-bootstrap").Button;
var Carrier = require("./carrier.js");

var VerifyPinModal = require("./verify_pin_modal");

var carriers = {
	ups: "UPS",
	usps: "USPS",
	fedex: "FedEx",
	dhl_express: "DHL Express",
	canada_post: "Canada Post",
	lasership: "LaserShip",
	mondial_relay: "Mondial Relay"
};

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
			pin: ""
		};
	},

	setCarrier: function (e, carrier) {
		e.preventDefault();

		this.setState({ carrier: carrier });
	},

	handleSubmit: function (e) {
		e.preventDefault();

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
		alert("Invalid tracking information.");

		this.setState(this.getInitialState());
	},

	handleValidTracking: function (data) {
		if (this.validPhoneNo()) {
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
			alert_updates: this.state.tracking
		};

		$.ajax({
			url: 'packages',
			type: 'POST',
			dataType: 'json',
			data: {package: packageData},
			success: function (data) {
				this.setState({ modalOpen: true, packageId: data.package_id });
			}.bind(this),
			error: function (data) {
				console.log("Failed");
			}
		});
	},

	toggleTracking: function () {
		this.setState({ tracking: !this.state.tracking });
	},

	dropdownTitle: function () {
		if (this.state.carrier === "") {
			return "Select carrier";
		} else {
			return carriers[this.state.carrier];
		}
	},

	carrierOptions: function () {
		return Object.keys(carriers).map(function (carrier) {
			return (
				<MenuItem eventKey={carrier} key={carrier}>
					{carriers[carrier]}
				</MenuItem>
			);
		});
	},

	carrierDropdown: function () {
		return (
			<DropdownButton title={this.dropdownTitle()}
				id="input-dropdown-addon"
				onSelect={this.setCarrier}
				pullRight>

				{this.carrierOptions()}
			</DropdownButton>
		);
	},

  openModal: function() {
    this.setState({ modalOpen: true });
  },

  closeModal: function() {
    this.setState({ modalOpen: false });
  },

	submitText: function () {
		if (this.state.phoneNo === "") {
			return "Find Package";
		} else {
			return "Find & Track Package";
		}
	},

	submitDisabled: function() {
		if (this.state.carrier === "") {
			return true;
		} else if (this.state.trackingNo === "") {
			return true;
		} else if (this.state.phoneNo === "") {
			return false;
		} else {
			return !this.validPhoneNo();
		}
	},

	validPhoneNo: function() {
		if (this.state.phoneNo.length !== 10) {
			return false;
		}

		return (this.state.phoneNo.match(/\d{10}/) !== null);
	},

	handleTrackNumberChange: function (e) {
		e.preventDefault();
		var trackingNumber = e.target.value;
		var carrier = Carrier.detect(trackingNumber);

		this.setState({ trackingNo: trackingNumber, carrier: carrier });
	},

	render: function  () {
		return (
			<form onSubmit={this.handleSubmit}>
				<figure className="monkey-logo">
					<img src="hanging-monkey.png"></img>
				</figure>
				<br/>

				<Input placeholder="Enter tracking number"
					type="text"
					buttonAfter={this.carrierDropdown()}
					onChange={this.handleTrackNumberChange}/>

    		<Well>
					<h4>Get SMS Updates (optional)</h4>

    			<Input placeholder="Enter phone number"
          	type="text"
          	valueLink={this.linkState("phoneNo")}/>

	        <Input type="checkbox"
	        	className="active"
	        	label="Keep me updated along the way"
	        	help="Leave this unchecked if you want to only be notified upon arrival"
	        	valueLink={this.linkState("receiveUpdates")}/>
    		</Well>

        <ButtonInput type="submit" block
					bsStyle="primary"
					bsSize="large"
					value={this.submitText()}
					disabled={this.submitDisabled()}/>

				<VerifyPinModal modalOpen={this.state.modalOpen}
					trackingNo={this.state.trackingNo}
					carrier={this.state.carrier}
					packageId={this.state.packageId}
					closeModal={this.closeModal}
					pushToMap={this.pushToMap} />
			</form>
		);
	}
});

module.exports = Form;
