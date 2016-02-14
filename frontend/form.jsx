var React = require('react');
var LinkedStateMixin = require('react-addons-linked-state-mixin');

var Input = require('react-bootstrap').Input;
var ButtonInput = require('react-bootstrap').ButtonInput;
var DropdownButton = require('react-bootstrap').DropdownButton;
var MenuItem = require('react-bootstrap').MenuItem;
var Collapse = require('react-bootstrap').Collapse;
var Well = require('react-bootstrap').Well;
var Button = require('react-bootstrap').Button;

var Form = React.createClass({
	mixins: [LinkedStateMixin],

	getInitialState: function  () {
		return {
			tracking: false,
			carrier: "",
			shipmentNo: "",
			phoneNo: "",
			receiveUpdates: true
		};
	},

	toggleCarrier: function (e, carrier) {
		e.preventDefault()

		this.setState({ carrier: carrier });
	},

	carriers: {
		usps: "USPS",
		fedex: "FedEx",
		dhl_express: "DHL Express",
		canada_post: "Canada Post",
		lasership: "LaserShip",
		modal_relay: "Modal Relay"
	},

	handleSubmit: function (e){
		e.preventDefault();

		var url = "/tracking/" + this.state.carrier + "___" + this.state.shipmentNo;
		this.context.router.push(url);
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
	}

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

	submitText: function () {
		return (this.state.tracking ? "Find & Track Package" : "Find Package");
	},

	render: function  () {
		return (
			<form onSubmit={this.handleSubmit}>
				<Input placeholder="Enter Shipment Number"
					type="text"
					buttonAfter={this.carrierDropdown}
					valueLink={this.linkState('shipmentNo')}/>

				<Button block onClick={this.toggleTracking}>
          Track Package
        </Button>

        <Collapse in={this.state.tracking}>
        	<div>
        		<Well>
        			<Input placeholder="Enter Phone Number"
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

        <br/>

        <ButtonInput type="submit" block
					bsStyle="primary"
					value={this.submitText()}/>
			</form>
		)
	}
});

module.exports = Form;

// <div className="input-group">
 //      <input type="text" className="form-control" placeholder="Tracking Number" aria-label="..."/>
 //      <div className="input-group-btn">
 //        <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Select Carrier<span className="caret"></span></button>
 //        <ul className="dropdown-menu dropdown-menu-right">
 //          <li><a href="#">Select Carrier</a></li>
 //          <li><a href="#">USPS</a></li>
 //          <li><a href="#">Fedex</a></li>
 //          <li><a href="#">DHL Express</a></li>
 //          <li><a href="#">Canada Post</a></li>
 //          <li><a href="#">Lasership</a></li>
 //          <li><a href="#">Mondial Relay</a></li>
 //        </ul>
 //      </div>
 //    </div>
