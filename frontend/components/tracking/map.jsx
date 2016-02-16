var React = require('react');
var MapStyle = require('./mapstyle.js');

var Map = React.createClass ({
  getInitialState: function() {
    return { markers: '' };
  },

  componentDidMount: function(){
     this.createMap();
     this.addMarkers();
   },

   createMap: function() {
     var mapDOMNode = this.refs.map;
     var mapOptions = {
			 center: {lat: 37.7758, lng: -122.435},
			 zoom: 12
     };
		 this.map = new google.maps.Map(mapDOMNode, mapOptions);
     this.map.setOptions({styles: MapStyle});
   },

   addMarkers: function() {
     var addresses = this.createAddressStrings();
		 var map = this.map;
		 var markerList = [];
     var that = this;

     var genMarker = function (i) {
       if (i < addresses.length) {
          $.getJSON('http://maps.googleapis.com/maps/api/geocode/json?address='+addresses[i]+'&sensor=false', null, function (data) {
            var p = data.results[0].geometry.location;
            var iconUrl = "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png";

            if (i === 0){
              iconUrl = "http://maps.google.com/mapfiles/ms/icons/green-dot.png";
            } else if (i === (addresses.length-1)) {
              iconUrl = "http://maps.google.com/mapfiles/ms/icons/red-dot.png";
            }

            var latlng = new google.maps.LatLng(p.lat, p.lng);
            var marker = new google.maps.Marker({
              position: latlng,
              map: map,
              icon: iconUrl
            });

            if (markerList.indexOf(marker) == -1) {
             markerList.push(marker);
            }

            genMarker(i + 1);
          });

       } else {
          that.setState({markers: markerList});
          that.fitBounds();
          that.createPolyLines();
       }
     }

     genMarker(0);


   },

   fitBounds: function() {
		 var bounds = new google.maps.LatLngBounds();
     for (var i = 0; i < this.state.markers.length; i++) {
       bounds.extend(this.state.markers[i].getPosition());
     }
     this.map.fitBounds(bounds);
   },

	 createPolyLines: function() {
		 var markerPathCoords = [];

		 for (var i = 0; i < this.state.markers.length; i++) {
			 var path = {};
			 path["lat"] = this.state.markers[i].getPosition().lat();
			 path["lng"] = this.state.markers[i].getPosition().lng();
			 markerPathCoords.push(path);
		 }

		 var markerPath = new google.maps.Polyline({
	     path: markerPathCoords,
	     geodesic: true,
	     strokeColor: '#FF0000',
	     strokeOpacity: 1.0,
	     strokeWeight: 2
	  	 });
		markerPath.setMap(this.map);
  },

 	getEventAddresses: function () {
	  var addresses = [];
	  var eventAddress;

		this.props.shipment["tracking_history"].forEach(function(trackingEvent){
		  eventAddress = {};
			eventAddress["location"] = trackingEvent["location"];
	  	addresses.unshift(eventAddress);
	  });

	  return addresses;
  },

  createAddressStrings: function () {
    var addresses = this.getEventAddresses();
    var addressStrings = [];
    var eventCurrent;
    var tempString;

    for (var i = 0; i < addresses.length; i++) {
			eventCurrent = addresses[i]["location"];
			tempString = [];

      for (var prop in eventCurrent) {
        tempString.push(eventCurrent[prop]);
      }

      addressStrings.push(tempString.join(' '));
    }

    return addressStrings;
  },

	generateHTMLLocation: function (location) {
		var locationArray = [];

		for (var props in location) {
			locationArray.push(location[props]);
		}

		return locationArray.join(' ');
	},

  render: function () {
    return <div className="map" ref="map"/>;
  }
});

module.exports = Map;
