var React = require('react');

var Map = React.createClass ({

  getInitialState: function() {
    return {
			markers: ''
		}
  },

  componentDidMount: function(){
     this.createMap();
     this.addMarkers();
   },

   createMap: function() {
     var mapDOMNode = this.refs.map;
     var mapOptions = {
	     scrollwheel: false,
			 center: {lat: 37.7758, lng: -122.435},
			 zoom: 12
     };

     this.setState({map: new google.maps.Map(mapDOMNode, mapOptions)});
		 this.map = new google.maps.Map(mapDOMNode, mapOptions);
   },

   addMarkers: function() {
     var addresses = this.createAddressStrings();
		 var map = this.map;
		 var markerList = [];


     for (var i = 0; i < addresses.length; i++) {
			 var that = this;
       $.getJSON('http://maps.googleapis.com/maps/api/geocode/json?address='+addresses[i]+'&sensor=false', null, function (data) {
           var p = data.results[0].geometry.location
           var latlng = new google.maps.LatLng(p.lat, p.lng);
           var marker = new google.maps.Marker({
               position: latlng,
               map: map
					 });
					 if (markerList.indexOf(marker) == -1) {
						 markerList.push(marker);
					 }

					 if (markerList.length === addresses.length) {
						 that.setState({markers: markerList});
						 that.fitBounds();
						 that.createPolyLines();
					 }
         });
      };
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
        addressStrings = [];

    for (var i = 0; i < addresses.length; i++) {
			var eventCurrent = addresses[i]["location"];
			var tempString = [];
      for (var prop in eventCurrent) {

        tempString.push(eventCurrent[prop]);
      }
      addressStrings.push(tempString.join(' '));
      tempString = '';
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
    return (
      <div className="map" ref="map"/>
    );
  }

});

module.exports = Map;
