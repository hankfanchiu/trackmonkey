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
			tracking: true,
			carrier: "",
			shipmentNo: "",
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

		var packageData = {
			phone_number: this.state.phoneNo,
			tracking_number: this.state.shipmentNo,
			carrier: this.state.carrier,
			alert_updates: this.state.tracking
		};

		if (this.state.phoneNo !== "") {
			$.ajax({
				url: 'packages',
				type: 'POST',
				dataType: 'json',
				data: {package: packageData},
				success: function (data) {
					console.log(data);
					this.setState({ modalOpen: true, packageId: data.package_id });
				}.bind(this),
				error: function (data) {
					console.log(data);
					console.log("Failed");
				}
			})
		} else {
			this.redirectToMap();
		}
	},

	redirectToMap: function () {
		var url = "/tracking/" + this.state.carrier + "___" + this.state.shipmentNo;
		this.context.router.push(url);
	},

	verifyPin: function () {
		var packageData = {
			phone_number: this.state.phoneNo,
			tracking_number: this.state.shipmentNo,
			pin: this.state.pin
		};

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
		return (this.state.tracking ? "Find & Track Package" : "Find Package");
	},

	render: function  () {
		return (
			<form onSubmit={this.handleSubmit}>
				<h1>Shitpro</h1>

				<Input placeholder="Enter Tracking Number"
					type="text"
					buttonAfter={this.carrierDropdown()}
					valueLink={this.linkState('shipmentNo')}/>

				<Button block onClick={this.toggleTracking}>
          Get SMS Updates
        </Button>

        <Collapse in={this.state.tracking}>
        	<div>
        		<Well>
        			<Input placeholder="Enter Phone Number (optional)"
		          	type="text"
		          	valueLink={this.linkState('phoneNo')}/>

			        <Input type="checkbox"
			        	className="active"
			        	label="Keep me updated along the way"
			        	help="Leave this unchecked if you want to only be notified upon arrival"
			        	valueLink={this.linkState('receiveUpdates')}/>
        		</Well>
        	</div>
        </Collapse>

        <ButtonInput type="submit" block
					bsStyle="primary"
					value={this.submitText()}/>

				{this.renderModal()}

				<span>CC272479357TW</span>
			</form>
		);
	}
});

module.exports = Form;
