var db = require('../postgis');
/*
 * GET home page.
 */
var gres;
exports.getMap = function(req, res){
	
  res.render('map', { title: 'hage' });
};

exports.getSchool = function(req, res){
	res.render('school', { title: 'hage' });
};
	
exports.getIcon = function(req, res){
		
	gres = res;
	//var coordinate = req.params.coordinate;
	db.getIcon(req,jsonout);
};
exports.getUser = function(req, res){
	
	gres = res;
	//var coordinate = req.params.coordinate;
	db.getUser(req,jsonout);
};


jsonout = function(req,res){
	gres.send(db.getString());
};