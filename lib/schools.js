

var request = require('request');
var _ = require('underscore');
var SCHOOL_URL = 'https://data.ct.gov/resource/a63s-zxeh.json';


function searchByAddress (address, callback) {
    console.log('searching for address', address);

    // TODO more rigorous
    var streetNum = address.split(' ')[0];
    console.log(streetNum);
    var streetName = address.substring(address.indexOf(' ') + 1);
    console.log(streetName);



    request(SCHOOL_URL, function(error, response, body) {

	var array = JSON.parse(body);
	
	var match = _.filter(array, function(obj) {
	    
	    var human_address = JSON.parse(obj['location_1']['human_address']);

	    console.log('comparing',  streetName, 'with', human_address);
	    return streetName == human_address.address;
//		&&
	    
	});
	
	callback(null, match);
    });
    
}

module.exports = {
    searchByAddress: searchByAddress
}

