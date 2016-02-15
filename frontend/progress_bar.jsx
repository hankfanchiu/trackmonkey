var React = require('react');
var ListGroup = require('react-bootstrap').ListGroup;
var ListGroupItem = require('react-bootstrap').ListGroupItem;
var Panel = require('react-bootstrap').Panel;

var ProgressBar = React.createClass({
  getInitialState: function () {
    return {
      firstHTMLEl: [],
      trackingHTMLEls: []
    };
  },

  componentDidMount: function() {
    this.setState({
      trackingHTMLEls: this.createHTMLEls(),
      firstHTMLEl: this.createFirstHTMLEl()
    });
  },

  generateHistory: function () {
    var historyItems = [];
    var eventDetails;

   	this.props.shipment["tracking_history"].forEach(function(trackingEvent){
      eventDetails = {};
      eventDetails["status"] = trackingEvent["status"];
      eventDetails["status_details"] = trackingEvent["status_details"];
      eventDetails["location"] = trackingEvent["location"];
      eventDetails["status_date"] = trackingEvent["status_date"];

      historyItems.unshift(eventDetails);
   	});

    return historyItems;
  },

  createHTMLEls: function () {
    var historyHTMLEls = [];
    var historyItems = this.generateHistory();

    for (var i = 1; i < historyItems.length; i++) {
      var eventCurrent = historyItems[i];
      var eventLocation = this.generateHTMLLocation(eventCurrent["location"]);
      var eventDate = (new Date(eventCurrent["status_date"])).toGMTString();

      var tempHTMLEl = (
        <ListGroupItem className="completed" key={i}>
          <span className="bubble"></span>
          <span className="stacked-text">
            <span><i>{eventCurrent["status"]} - {eventDate}</i></span><br/><br/>
            <span>{eventCurrent["status_details"]}</span><br/>
            <span><b>{eventLocation}</b></span><br/><br/>
          </span>
        </ListGroupItem>
      );

      historyHTMLEls.push(tempHTMLEl);
    }

    return historyHTMLEls;
  },

  createFirstHTMLEl: function () {
    var firstHTMLEl = [];
    var firstItem = this.generateHistory()[0];
    var firstItemLocation = this.generateHTMLLocation(firstItem["location"]);
    var firstItemDate = (new Date(firstItem["status_date"])).toGMTString();

    var tempHTMLEl = (
      <span className="stacked-text" key={1}>
        <span><i>{firstItem["status"]} - {firstItemDate}</i></span><br/><br/>
        <span>{firstItem["status_details"]}</span><br/>
        <span><b>{firstItemLocation}</b></span><br/><br/>

        <div className="arrow"><i className="fa fa-arrow-down"></i></div>
      </span>
    );

    firstHTMLEl.push(tempHTMLEl);

    return firstHTMLEl;
  },

  generateHTMLLocation: function (location) {
    var locationArray = [];

    for (var props in location) {
      locationArray.push(location[props]);
    }

    return locationArray.join(' ');
  },

  render: function () {
    return (
      <Panel collapsible defaultCollapsed header={this.state.firstHTMLEl}>
        <ListGroup className="location-list" fill>
          {this.state.trackingHTMLEls}
        </ListGroup>
      </Panel>
    );
  }
});

module.exports = ProgressBar;
