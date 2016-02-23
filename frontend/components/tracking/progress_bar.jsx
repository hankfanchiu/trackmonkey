var React = require("react");
var ListGroup = require("react-bootstrap").ListGroup;
var ListGroupItem = require("react-bootstrap").ListGroupItem;
var Panel = require("react-bootstrap").Panel;
var getAddressFromLocation = require("../../utils/get_address_from_location");

var ProgressBar = React.createClass({
  mostRecentLocation: function () {
    var trackingHistory = this.props.trackingHistory;

    if (trackingHistory.length === 0) { return <span></span>; }

    var tracking = trackingHistory[trackingHistory.length - 1];
    var date = new Date(tracking.status_date).toGMTString();
    var address = getAddressFromLocation(tracking.location);

    return (
      <div key={1}>
        <div className="tracking-status">{tracking.status}</div>
        <div className="tracking-data">{date}</div>
        <div className="tracking-data">{address}</div>

        <div className="tracking-detail">{tracking.status_details}</div>

        <div className="arrow">
          <i className="fa fa-arrow-down"></i>
        </div>
      </div>
    );
  },

  locationList: function () {
    var trackingHistory = this.props.trackingHistory;

    if (trackingHistory.length <= 1) { return; }

    var locationList = [];
    var tracking, date, address, locationItem;

    for (var i = trackingHistory.length - 2; i >= 0; i--) {
      tracking = trackingHistory[i];
      date = new Date(tracking.status_date).toGMTString();
      address = getAddressFromLocation(tracking.location);

      locationItem = (
        <ListGroupItem className="completed" key={i}>
          <div className="tracking-status">{tracking.status}</div>
          <div className="tracking-data">{date}</div>
          <div className="tracking-data">{address}</div>

          <div className="tracking-detail">{tracking.status_details}</div>
        </ListGroupItem>
      );

      locationList.push(locationItem);
    }

    return locationList;
  },

  render: function () {
    return (
      <Panel collapsible
        defaultCollapsed
        header={this.mostRecentLocation()}>

        <ListGroup className="location-list" fill>
          {this.locationList()}
        </ListGroup>
      </Panel>
    );
  }
});

module.exports = ProgressBar;
