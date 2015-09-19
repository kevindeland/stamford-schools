

var request = require('request'),
    _ = require('underscore'),
    async = require('async');
var SCHOOL_URL = 'https://data.ct.gov/resource/a63s-zxeh.json';

var high_schools = [
    'STAMFORD HIGH SCHOOL',
    'WESTHILL HIGH SCHOOL'
];

function searchByAddress (address, callback) {
    console.log('searching for address', address);

    // TODO more rigorous
    var streetNum = parseInt(address.split(' ')[0]);
    console.log(streetNum);
    var streetName = address.substring(address.indexOf(' ') + 1);
    console.log(streetName);
    
    // json API request limimted to 1000, so split into a request for each high school
    async.parallel([
	function(callback) {
	    var url =  SCHOOL_URL + '?h_sch=' + encodeURIComponent(high_schools[0]);
	    console.log(url);
	    request(url, function(err, response, body) {
		
		var array = JSON.parse(body);
		callback(null, array);
	    });
	}, function(callback) {
	    var url =  SCHOOL_URL + '?h_sch=' + encodeURIComponent(high_schools[1]);
	    console.log(url);
	    request(url, function(err, response, body) {

		var array = JSON.parse(body);
		callback(null, array);
	    });
	}
    ] , function(err, results) {
	var all = results[0].concat(results[1]);
	console.log('found ' + results[0].length + ' + ' + results[1].length + ' = ' + all.length);
	
	var match = _.filter(all, matchObjToAddress(streetNum, streetName));
	if (match.length == 0) {
	    callback(null, {})
	    return;
	}

	var formatted = applyFormat(match[0], address, streetNum, streetName);
	callback(null, formatted);
    });
    
}

var suffixes = {
    'RD': 'ROAD',
    'STREET': 'ST',
    'PL': 'PLACE'
    
}

function matchObjToAddress(streetNum, streetName) {
    return function(obj) {

	// format suffix
	var lastSpace = streetName.lastIndexOf(' ');
	var suffix = streetName.substring(lastSpace + 1);
	
	if (suffixes[suffix]) {
	    streetName = streetName.substring(0, lastSpace + 1) + suffixes[suffix];
	}
	
	var address = JSON.parse(obj['location_1']['human_address']).address;
	//	    console.log('comparing',  streetName, 'with', human_address);
	
	return address.indexOf(streetName) == 0

	// street number check
	    && (obj.side == 'Both' || ((obj.side == 'Even' && streetNum % 2 == 0) || (obj.side == 'Odd' && streetNum % 2 == 1)))
	    && streetNum >= obj.hn_start
	    && streetNum <= obj.hn_end;

    }
}

function applyFormat(object, address, streetNum, streetName) {

    object.address = {
	full: address,
	street_name: streetName,
	street_num: streetNum
    }
    return object;
}

module.exports = {
    searchByAddress: searchByAddress
}

