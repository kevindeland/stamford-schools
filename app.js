
var express = require('express');
var app = express();

var _  = require('underscore');

var schools = require('./lib/schools');

/**
 * API
 */ 
app.get('/api/schools/address', function(req, res) {
    
    var address = req.query.address;
    schools.searchByAddress(address, function(err, results) {

	res.send(results);
    });
});


app.get('/api/schools/details', function(req, res) {

    var school = req.query.school_name;
    var all = require(__dirname + '/config/data').schools;

    var match =  _.filter(all, function(obj) {
	return obj.name.indexOf(school) == 0 || school.indexOf(obj.name) == 0;
    });
    
    res.send(match);
});

app.get('/api/schools/all', function(req, res) {

    res.send(require(__dirname + '/config/data').schools);
});

var host = (process.env.VCAP_APP_HOST || 'localhost');
var port = (process.env.VCAP_APP_PORT || 3000);
// Start server
app.listen(port, host);
console.log('App started on port ' + port);

