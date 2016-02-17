var React = require('react');
var ListGroup = require('react-bootstrap').ListGroup;
var ListGroupItem = require('react-bootstrap').ListGroupItem;
var Panel = require('react-bootstrap').Panel;
var addressFromLocation = require('./addressFromLocation');

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
          <span className="event" key={1}>
            <b><span>{eventCurrent["status"]}</span><br/></b>
            <span>{eventDate}</span><br/>
            <span>{eventLocation}</span><br/><br/>
            <span>{eventCurrent["status_details"]}</span><br/>
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
    var firstItemLocation = addressFromLocation(firstItem["location"]);
    var firstItemDate = (new Date(firstItem["status_date"])).toGMTString();

    var tempHTMLEl = (
      <span className="firstEvent" key={1}>
        <b><span>{firstItem["status"]}</span><br/></b>
        <span>{firstItemDate}</span><br/>
        <span>{firstItemLocation}</span><br/><br/>
        <span>{firstItem["status_details"]}</span><br/><br/>

        <div className="arrow"><i className="fa fa-arrow-down"></i></div>
      </span>
    );

    firstHTMLEl.push(tempHTMLEl);

    return firstHTMLEl;
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
