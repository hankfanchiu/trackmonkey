var React = require('react');
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var browserHistory = require('react-router').browserHistory;
var Input = require('react-bootstrap').Input;
var ButtonInput = require('react-bootstrap').ButtonInput;
var DropdownButton = require('react-bootstrap').DropdownButton;
var MenuItem = require('react-bootstrap').MenuItem;
var Collapse = require('react-bootstrap').Collapse;
var Well = require('react-bootstrap').Well;
var Button = require('react-bootstrap').Button;
var Modal = require('react-bootstrap').Modal;

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

	toggleCarrier: function (e, carrier) {
		e.preventDefault();

		this.setState({ carrier: carrier });
	},

	carriers: {
		ups: "UPS",
		usps: "USPS",
		fedex: "FedEx",
		dhl_express: "DHL Express",
		canada_post: "Canada Post",
		lasership: "LaserShip",
		modal_relay: "Modal Relay"
	},

	contextTypes: {
    router: React.PropTypes.func.isRequired
  },

	handleSubmit: function (e) {
		e.preventDefault();

		this.getTracking();
	},

	redirectToMap: function () {
		var url = "/tracking/" + this.state.carrier + "___" + this.state.trackingNo;
		this.context.router.push(url);
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
			this.redirectToMap();
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

	verifyPin: function () {
		var packageData = { pin: this.state.pin };

		$.ajax({
			url: 'packages/' + this.state.packageId,
			type: 'PATCH',
			dataType: 'json',
			data: {package: packageData},
			success: function () {
				this.redirectToMap();
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
			return "Select Carrier";
		} else {
			return this.carriers[this.state.carrier];
		}
	},

	carrierDropdown: function () {
		var carrierOptions = Object.keys(this.carriers).map(function(carrier){
			return (
				<MenuItem eventKey={carrier} key={carrier}>
					{this.carriers[carrier]}
				</MenuItem>
			);
		}.bind(this));

		return (
			<DropdownButton title={this.dropdownTitle()}
				id="input-dropdown-addon"
				onSelect={this.toggleCarrier}>

				{carrierOptions}

			</DropdownButton>
		);
	},

	renderModal: function () {
    return (
      <Modal show={this.state.modalOpen}
        onHide={this.closeModal}
				bsSize="small"
				aria-labelledby="contained-modal-title-sm">

				<Modal.Header closeButton>
					<Modal.Title>Enter your PIN</Modal.Title>
				</Modal.Header>

				<Modal.Body>
					<Input placeholder="PIN #"
						type="text"
						valueLink={this.linkState("pin")}/>

					<Button block onClick={this.verifyPin}>
						Submit
					</Button>
				</Modal.Body>
      </Modal>
    );
  },

  openModal: function() {
    this.setState({ modalOpen: true });
  },

  closeModal: function() {
    this.setState({ modalOpen: false });
  },

	submitText: function () {
		return (this.state.phoneNo === "" ? "Find Package" : "Find & Track Package");
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
		return this.state.phoneNo.match(/\d{10}/) !== null;
	},

	render: function  () {
		return (
			<form onSubmit={this.handleSubmit}>
				<h1 className="title">TRACKMONKEY</h1>

		  	<img src="http://monkeybusinessinstitute.com/images/hanging-monkey.png"></img><br/><br/>

				<Input placeholder="Enter Tracking Number"
					type="text"
					buttonAfter={this.carrierDropdown()}
					valueLink={this.linkState('trackingNo')}/>

    		<Well>
					<h4>Get SMS Updates (optional)</h4>
    			<Input placeholder="Enter Phone Number"
          	type="text"
          	valueLink={this.linkState('phoneNo')}/>

	        <Input type="checkbox"
	        	className="active"
	        	label="Keep me updated along the way"
	        	help="Leave this unchecked if you want to only be notified upon arrival"
	        	valueLink={this.linkState('receiveUpdates')}/>
    		</Well>

        <ButtonInput type="submit" block
					bsStyle="primary"
					value={this.submitText()}
					disabled={this.submitDisabled()}/>

				{this.renderModal()}

			</form>
		);
	}
});

module.exports = Form;
