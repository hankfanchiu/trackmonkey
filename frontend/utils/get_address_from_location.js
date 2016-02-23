var customsDictionary = require("./customs_dictionary");

var getAddressFromLocation = function(location) {
  var address = "";
  var component;

  for (var prop in location) {
    component = location[prop];

    if (!component) { continue; }

    if (customsDictionary[component.toUpperCase()]) {
      component = customsDictionary[component.toUpperCase()];
    }

    component += (prop === "city" ? ", " : " ");
    address += component;
  }

  return address;
};

module.exports = getAddressFromLocation;
