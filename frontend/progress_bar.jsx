var React = require('react');

var ProgressBar = React.createClass({
  getInitialState: function () {
    return { trackingHTMLEls: [] };
  },

  componentDidMount: function() {
    this.setState({ trackingHTMLEls: this.createHTMLEls() });
  },

  generateHistory: function () {
    var historyItems = [];
    var eventDetails;

    console.log(this.props.shipment["tracking_history"]);

   	this.props.shipment["tracking_history"].forEach(function(trackingEvent){
      eventDetails = {};
      eventDetails["status"] = trackingEvent["status"];
      eventDetails["status_details"] = trackingEvent["status_details"];
      eventDetails["location"] = trackingEvent["location"];

      historyItems.push(eventDetails);
   	});

    console.log("genhistory items.length");
    console.log(historyItems.length);

    return historyItems;
  },

  createHTMLEls: function () {
    var historyHTMLEls = [];
    var historyItems = this.generateHistory();
    var eventCurrent;
    var eventLocation;

    for (var i = 0; i < historyItems.length; i++) {
      eventCurrent = historyItems[i];
      eventLocation = this.generateHTMLLocation(eventCurrent["location"]);
        // eventDate = new Date(eventCurrent["date"]);

      tempHTMLEl = (
        <li className="completed">
          <span className="bubble"></span>
          <span className="stacked-text">
              <span>{eventCurrent["status"]}</span><br/>
              <span>{eventCurrent["status_details"]}</span><br/>
              <span>{eventLocation}</span>
          </span>
        </li>
      );

      historyHTMLEls.push(tempHTMLEl);
    }

    console.log("createHTMLEls items.length");
    console.log(historyHTMLEls.length);

    return historyHTMLEls;
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
      <ul className="progress-indicator nocenter stepped stacked">
        {this.state.trackingHTMLEls}
      </ul>
    );
  }
});

module.exports = ProgressBar;