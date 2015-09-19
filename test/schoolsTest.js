

var schools = require('../libs/schools');

var testVals = {
    "14 arthur place": {
	"MIDDLE": "DOLAN MIDDLE SCHOOL",
	"ELEMENTARY": "JULIA A. STARK",
	"HIGH SCHOOL": "STAMFORD HIGH SCHOOL"
    }
    
}

exports.searchByAddress = function(test) {
    
    Object.keys(testVals).forEach(function(address) {

	schools.searchByAddress(testVals[address], function(err, result) {
	    console.log('ay')
	    test.equal(err, null);

	    console.log(result);
	    test.done();
	    
	});
    });
    

    
    
    
};
