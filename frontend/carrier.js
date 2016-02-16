var Carrier = {
  detect: function (trackingNumber) {
    if (trackingNumber.match(/\b(1Z ?[0-9A-Z]{3} ?[0-9A-Z]{3} ?[0-9A-Z]{2} ?[0-9A-Z]{4} ?[0-9A-Z]{3} ?[0-9A-Z]|[\dT]\d\d\d ?\d\d\d\d ?\d\d\d)\b/)) {
      return "ups"
    } else if (trackingNumber.match(/(\b96\d{20}\b)|(\b\d{15}\b)|(\b\d{12}\b)/)) {
      return "fedex"
    } else if (trackingNumber.match(/\b((98\d\d\d\d\d?\d\d\d\d|98\d\d) ?\d\d\d\d ?\d\d\d\d( ?\d\d\d)?)\b/)) {
      return "fedex"
    } else if (trackingNumber.match(/^[0-9]{15}$/)) {
      return "fedex"
    } else if (trackingNumber.match(/(\b\d{30}\b)|(\b91\d+\b)|(\b\d{20}\b)/)) {
      return "usps"
    } else if (trackingNumber.match(/^E\D{1}\d{9}\D{2}$|^9\d{15,21}$/)) {
      return "usps"
    } else if (trackingNumber.match(/^91[0-9]+$/)) {
      return "usps"
    } else if (trackingNumber.match(/^[A-Za-z]{2}[0-9]+US$/)) {
      return "usps"
    } else if (trackingNumber.match(/^[0-9]{4} [0-9]{4} [0-9]{2}$/)) {
      return "dhl_express"
    } else if (trackingNumber.match(/^JD\d{18}$/)) {
      return "dhl_express"
    } else if (trackingNumber.match(/^\d{10}$/)) {
      return "dhl_express"
    } else if (trackingNumber.match(/^\d{16}$/)) {
      return "canada_post"
    } else if (trackingNumber.match(/^[A-Z]{2}\d{9}CA$/)) {
      return "canada_post"
    } else if (trackingNumber.match(/^\d{1}LS\d+$/)) {
      return "lasership"
    } else if (trackingNumber.match(/^\d{8}$/)) {
      return "mondial_relay"
    } else {
      return ""
    }
  }
};

module.exports = Carrier;
