var React = require('react'),
	LinkedStateMixin = require('react-addons-linked-state-mixin'),
	History = require('react-router').History;

var Input = require('react-bootstrap').Input,
	ButtonInput = require('react-bootstrap').ButtonInput,
	DropdownButton = require('react-bootstrap').DropdownButton,
	MenuItem = require('react-bootstrap').MenuItem,
	Collapse = require('react-bootstrap').Collapse,
	Well = require('react-bootstrap').Well
	Button = require('react-bootstrap').Button;

var carriers = {
		usps: "USPS",
		fedex: "FedEx",
		dhl_express: "DHL Express",
		canada_post: "Canada Post",
		lasership: "LaserShip",
		modal_relay: "Modal Relay"
};

var Form = React.createClass({
	mixins: [LinkedStateMixin, History],

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

		this.setState({ carrier: carrier })
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
		this.history.push(url);
		console.log(url);
	},

	render: function  () {
		var submitText = this.state.tracking ? "Find & Track Package" : "Find Package"

		var carrierOptions = Object.keys(this.carriers).map(function(carrier){
			return <MenuItem eventKey={carrier} key={carrier}>{this.carriers[carrier]}</MenuItem>;
		}.bind(this));

		var dropdownTitle = this.state.carrier === "" ? "Select Carrier" : this.carriers[this.state.carrier];

		var carrierDropdown = (
			<DropdownButton title={dropdownTitle} id="input-dropdown-addon" onSelect={this.toggleCarrier} >
				{carrierOptions}
  			</DropdownButton>
		);

		return (
			<form onSubmit={this.handleSubmit}>
				<Input 
					placeholder="Enter Shipment Number"
		          	type="text"
		          	buttonAfter={carrierDropdown}
		          	valueLink={this.linkState('shipmentNo')}/>
		        <Button block onClick={ ()=> this.setState({ tracking: !this.state.tracking })}>
		          Track Package
		        </Button>
		        <Collapse in={this.state.tracking}>
		        	<div>
		        		<Well>
		        			<Input 
								placeholder="Enter Phone Number"
					          	type="text"
					          	valueLink={this.linkState('phoneNo')}/>
					        <Input 
					        	type="checkbox" 
					        	className="active"
					        	label="Keep me updated along the way" 
					        	help="Leave this unchecked if you want to only be notified upon arrival"
					        	valueLink={this.linkState('receiveUpdates')}/>
		        		</Well>
		        	</div>
		        </Collapse>

		        <br/>

		        <ButtonInput type="submit" bsStyle="primary" value={submitText} block/>
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
