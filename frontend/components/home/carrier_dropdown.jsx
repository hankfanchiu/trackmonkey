var React = require("react");
var DropdownButton = require("react-bootstrap").DropdownButton;
var MenuItem = require("react-bootstrap").MenuItem;
var carriers = require("../../utils/carriers");

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
			<DropdownButton pullRight
				id="input-dropdown-addon"
				title={this.dropdownTitle()}
				onSelect={this.setCarrier}>

				{this.carrierOptions()}
			</DropdownButton>
		);
	}
});

module.exports = CarrierDropdown;
