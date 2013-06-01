var db = require('../postgis');
/*
 * GET users listing.
 */
var gres;
exports.list = function(req, res){
	gres = res;
	//var coordinate = req.params.coordinate;
	db.getData(req.params.coordinate,res);
	//res.send(db.getString());
};

exports.school = function(req, res){
	gres = res;

	db.getSchoolById(req.params.id,function(){res.send(db.getString());});

};

exports.mapview = function(req, res){

	db.getMapById(req.params.id,function(map){
		res.render('mapview', {  map:map });
	});

};


exports.poi = function(req, res){
	gres = res;
	//console.log(req.param("name"))
	//var coordinate = req.params.coordinate;
	db.postPOI(req,null);
	//res.send(db.getString());
};

exports.map = function(req, res){
	gres = res;
	//console.log(req.param("name"))
	//var coordinate = req.params.coordinate;
	db.postMap(req,jsonout);
	//res.send(db.getString());
};

jsonout = function(req,res){
	gres.send(db.getString());
};