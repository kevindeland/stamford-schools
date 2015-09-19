

var request = require('request');
var _ = require('underscore');
var SCHOOL_URL = 'https://data.ct.gov/resource/a63s-zxeh.json';


function searchByAddress (address, callback) {
    
    request(SCHOOL_URL, function(error, response, body) {
	
	callback(null, body);
    });
    
}

module.exports = {
    searchByAddress: searchByAddress
}

