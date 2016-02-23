var customsDictionary = require("./customs_dictionary");

var getAddressFromLocation = function (location) {
  var address = "";
  var addressComponent;

  for (var prop in location) {
    addressComponent = location[prop];

    if (!addressComponent) { continue; }

    if (customsDictionary[addressComponent.toUpperCase()]) {
      addressComponent = customsDictionary[addressComponent.toUpperCase()];
    }

    addressComponent += (prop === "city" ? ", " : " ");
    address += addressComponent;
  }

  return address;
};

module.exports = getAddressFromLocation;
