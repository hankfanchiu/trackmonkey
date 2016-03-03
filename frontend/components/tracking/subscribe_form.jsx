var React = require("react");
var LinkedStateMixin = require("react-addons-linked-state-mixin");
var Input = require("react-bootstrap").Input;
var ButtonInput = require("react-bootstrap").ButtonInput;
var validPhoneNo = require("../../utils/valid_phone_number");

var SubscribeForm = React.createClass({
  mixins: [LinkedStateMixin],

  getInitialState: function () {
    return {
      phoneNo: ""
    }
  },

  postPackageData: function () {
		var packageData = {
			phone_number: this.state.phoneNo,
			tracking_number: this.props.trackingDetails.trackingNo,
			carrier: this.props.trackingDetails.carrier,
			alert_updates: true
		};

		$.ajax({
			url: '../packages',
			type: 'POST',
			dataType: 'json',
			data: {package: packageData},
			success: function (data) {
        alert("success");
				// this.setState({ modalOpen: true, packageId: data.package_id });
			}.bind(this),
			error: function (data) {
				console.log("Failed");
			}
		});
	},

	subscribeButton: function() {
		return (
			<ButtonInput
				onClick={this.postPackageData}
				disabled={!validPhoneNo(this.state.phoneNo)}>
				Subscribe
			</ButtonInput>
		)
	},

  render: function () {
    return (
      <Input
        placeholder="Enter phone number for SMS updates"
        type="text"
        valueLink={this.linkState("phoneNo")}
        buttonAfter={this.subscribeButton()}>
      </Input>
    );
  }
});

module.exports = SubscribeForm;
