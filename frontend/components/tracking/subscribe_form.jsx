var React = require("react");
var LinkedStateMixin = require("react-addons-linked-state-mixin");
var Input = require("react-bootstrap").Input;
var ButtonInput = require("react-bootstrap").ButtonInput;
var validPhoneNo = require("../../utils/valid_phone_number");
var VerifyPinModal = require('../home/verify_pin_modal');

var SubscribeForm = React.createClass({
  mixins: [LinkedStateMixin],

  getInitialState: function () {
    return {
      phoneNo: "",
      packageId: "",
      modalOpen: false,
      subscribed: false
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
			url: '/packages',
			type: 'POST',
			dataType: 'json',
			data: {package: packageData},
			success: function (data) {
        if (data.error) {
          alert ("looks like youre already tracking this package");
        } else {
          this.setState({
            modalOpen: true,
            packageId: data.package_id
          });
        }
			}.bind(this),
			error: function (data) {
				console.log("Failed");
			}
		});
	},

  closeModal: function() {
    this.setState({ modalOpen: false });
  },

  onSuccess: function () {
    this.setState({
      modalOpen: false,
      subscribed: true
     });
  },

	subscribeButton: function() {
		return (
			<ButtonInput
        bsStyle="primary"
				onClick={this.postPackageData}
				disabled={this.buttonDisabled()}>
				{this.buttonText()}
			</ButtonInput>
		)
	},

  buttonDisabled: function() {
    if (this.state.subscribed) {
      return true;
    } else {
      return !validPhoneNo(this.state.phoneNo);
    }
  },

  buttonText: function() {
    if (this.state.subscribed) {
      return "Subscribed!";
    } else {
      return "Subscribe";
    }
  },

  render: function () {
    return (
      <div className="retro-track">
        <Input
          placeholder="Enter phone number for SMS updates"
          type="text"
          valueLink={this.linkState("phoneNo")}
          buttonAfter={this.subscribeButton()} />

        <VerifyPinModal modalOpen={this.state.modalOpen}
					trackingNo={this.props.trackingDetails.trackingNo}
					carrier={this.props.trackingDetails.carrier}
					packageId={this.state.packageId}
					onSuccess={this.onSuccess}
          closeModal={this.closeModal} />
      </div>
    );
  }
});

module.exports = SubscribeForm;
