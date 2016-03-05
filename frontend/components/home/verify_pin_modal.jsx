var React = require("react");
var LinkedStateMixin = require("react-addons-linked-state-mixin");
var Modal = require("react-bootstrap").Modal;
var Input = require("react-bootstrap").Input;
var Button = require("react-bootstrap").Button;

var VerifyPinModal = React.createClass({
	mixins: [LinkedStateMixin],

	getInitialState: function  () {
		return { pin: "" };
	},

  disabled: function () {
    return (this.state.pin.match(/\d{4}/) === null);
  },

  handleSubmit: function (e) {
    e.preventDefault();

    if (!this.disabled()) {
      this.verifyPin();
    }
  },

	verifyPin: function () {
		var packageData = {
			tracking_number: this.props.trackingNo,
			carrier: this.props.carrier,
			pin: this.state.pin
		};

		$.ajax({
			url: '/packages/' + this.props.packageId,
			type: 'PATCH',
			dataType: 'json',
			data: {package: packageData},
			success: function () {
				this.props.onSuccess();
			}.bind(this),
			error: function (data) {
				console.log("Failed");
			}
		});
	},

	render: function () {
    return (
      <Modal show={this.props.modalOpen}
        onHide={this.props.closeModal}
				bsSize="small"
				aria-labelledby="contained-modal-title-sm">

				<Modal.Header closeButton>
					<Modal.Title>Verify Your Phone Number</Modal.Title>
				</Modal.Header>

				<Modal.Body>
					<p>A text message with the verification code has been sent to your phone number.</p>

          <form onSubmit={this.handleSubmit}>
  					<Input placeholder="Enter your PIN"
  						type="text"
  						valueLink={this.linkState("pin")}/>

  					<Button block bsStyle="primary"
              disabled={this.disabled()}
              onClick={this.verifyPin}>

  						Submit
  					</Button>
          </form>
				</Modal.Body>
      </Modal>
    );
	}
});

module.exports = VerifyPinModal;
