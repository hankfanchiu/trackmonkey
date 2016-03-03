var validPhoneNo =  function(phoneNo) {
	if (phoneNo.length !== 10) {
		return false;
	}

  return (phoneNo.match(/\d{10}/) !== null);
}

module.exports = validPhoneNo;
