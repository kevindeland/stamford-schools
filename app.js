
var express = require('express');
var app = express();

var schools = require('./lib/schools');

app.get('/school/address', function(req, res) {

    var address = req.query.address;
    schools.searchByAddress(address, function(err, results) {

	res.send(results);
    });
});


var host = (process.env.VCAP_APP_HOST || 'localhost');
var port = (process.env.VCAP_APP_PORT || 3000);
// Start server
app.listen(port, host);
console.log('App started on port ' + port);

