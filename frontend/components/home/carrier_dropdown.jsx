var React = require("react");
var DropdownButton = require("react-bootstrap").DropdownButton;
var MenuItem = require("react-bootstrap").MenuItem;

var carriers = {
	ups: "UPS",
	usps: "USPS",
	fedex: "FedEx",
	dhl_express: "DHL Express",
	canada_post: "Canada Post",
	lasership: "LaserShip",
	mondial_relay: "Mondial Relay"
};

var CarrierDropdown = React.createClass({
	setCarrier: function (e, carrier) {
		e.preventDefault();

		this.props.setCarrier(carrier);
	},

	dropdownTitle: function () {
		if (this.props.carrier === "") {
			return "Select carrier";
		} else {
			return carriers[this.props.carrier];
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

	render: function () {
		return (
			<DropdownButton title={this.dropdownTitle()}
				id="input-dropdown-addon"
				onSelect={this.setCarrier}
				pullRight>

				{this.carrierOptions()}
			</DropdownButton>
		);
	}
});

module.exports = CarrierDropdown;
