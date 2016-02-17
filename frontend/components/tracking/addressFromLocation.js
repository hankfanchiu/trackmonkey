var customsDictionary = require('./customs.js');

module.exports = function(locationObject) {
  var addressStringsArray = [];
  var addressString;

  for (var prop in locationObject) {
    locationComponent = locationObject[prop]

    if (locationComponent === null || locationComponent === "") {
      continue;
    } else {
      for (var key in customsDictionary) {
        var breakEarly = false;
        if (locationComponent.toUpperCase().match(key)) {
          addressStringsArray.push(customsDictionary[key])
          breakEarly = true;
          break;
        }
      }
      if (breakEarly === false && locationComponent !== "") {
        addressStringsArray.push(locationComponent)
      }
    }
  }

  addressString = addressStringsArray.join(' ');
  return addressString;
}
