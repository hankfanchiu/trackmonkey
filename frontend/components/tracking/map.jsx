var React = require("react");
var mapStyle = require("../../utils/map_style");
var getAddressFromLocation = require("../../utils/get_address_from_location");
var MarkerIconUrls = require("../../utils/marker_icon_urls");

var Map = React.createClass ({
  componentDidMount: function(){
     this.addGoogleMaps();
     this.addLatLngBounds();
     this.addPolyline();
     this.addTrackingMarkers();
   },

  addGoogleMaps: function() {
    var mapDOMNode = this.refs.map;
    var mapOptions = {
			center: {
        lat: 37.7758,
        lng: -122.435
      },
			zoom: 12,
      styles: mapStyle,
      mapTypeControl: false,
      scaleControl: false,
      streetViewControl: false,
      rotateControl: false,
      fullscreenControl: false
    };

		this.map = new google.maps.Map(mapDOMNode, mapOptions);
  },

  addLatLngBounds: function () {
    this.bounds = new google.maps.LatLngBounds();
  },

  addPolyline: function () {
    this.polyline = new google.maps.Polyline({
      geodesic: true,
      strokeColor: "#FF0000",
      strokeOpacity: 1.0,
      strokeWeight: 2
    });

    this.polyline.setMap(this.map);
  },

  addTrackingMarkers: function () {
    var trackingHistory = this.props.trackingHistory;
    var seenLocations = {};
    var tracking, location, address, iconUrl;

    for (var i = trackingHistory.length - 1; i >= 0; i--) {
      tracking = trackingHistory[i];
      address = getAddressFromLocation(tracking.location);

      if (address === " " || address === "" || seenLocations[address]) {
        continue;
      } else {
        seenLocations[address] = true;
      }

      if (i === trackingHistory.length - 1) {
        iconUrl = MarkerIconUrls.green;
      } else if (i === 0) {
        iconUrl = MarkerIconUrls.red;
      } else {
        iconUrl = MarkerIconUrls.yellow;
      }

      this.addMapMarker(address, iconUrl);
    }
  },

  addMapMarker: function (address, iconUrl) {
    var geoUrl = "http://maps.googleapis.com/maps/api/geocode/json?address=";
    var coordinate, latLng, marker;

    $.getJSON(geoUrl + address + "&sensor=false", null, function (data) {
      if (!data.results[0]) { return; }

      coordinate = data.results[0].geometry.location;
      latLng = new google.maps.LatLng(coordinate.lat, coordinate.lng);
      marker = new google.maps.Marker({
        position: latLng,
        map: this.map,
        icon: iconUrl
      });

      this.addPositionToPolyline(latLng);
      this.fitBoundsToMarkerPosition(latLng);
    }.bind(this));
  },

  addPositionToPolyline: function (markerPosition) {
    var path = this.polyline.getPath();

    path.push(markerPosition);
  },

  fitBoundsToMarkerPosition: function (markerPosition) {
    this.bounds.extend(markerPosition);

    this.map.fitBounds(this.bounds);
  },

  render: function () {
    return (
      <figure className="map" ref="map"/>
    );
  }
});

module.exports = Map;
