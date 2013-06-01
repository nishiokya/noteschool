var pg = require('pg');


var conString = "pgsql://postgres:@localhost:5432/school";

 var output = "";

 exports.getString = function(){
	 return output;
 };
 //select * from area2 where  ST_WITHIN(ST_GeomFromText('POINT(  136.9357219175257 35.170806247422675   )') , wkb_geometry);;
exports.getData = function(coordinate,callback){
	pg.connect(conString, function(err, client) {
		  if (err) {
		    console.log(err);
		  } else {
			var geom = coordinate.split(",");
			if( geom.length == 2){
		    client.query("select ogc_fid,ST_ASGeoJSON(wkb_geometry),ST_ASGeoJSON(point) as point,ccd,ins,esn,ads from area2 where  ST_WITHIN(ST_GeomFromText('POINT(  "+geom[1] + " "+geom[0] +"   )') , wkb_geometry);", function(err, result) {
		      console.log("Row count: %d",result.rows.length);
		      output = (JSON.stringify(result.rows));
		      console.log(output);
		      callback.send(output);
		      
		    });
		  	}else{
		  		console.log("geom error");
		  	}
		  }
	});
};
exports.getSchoolById = function(id,callback){
	pg.connect(conString, function(err, client) {
		  if (err) {
		    console.log(err);
		  } else {

		    client.query("select ogc_fid,ST_ASGeoJSON(wkb_geometry),ST_ASGeoJSON(point) as point,ccd,ins,esn,ads from area2 where ogc_fid = "+id, function(err, result) {
		      console.log("Row count: %d",result.rows.length);
		      output = (JSON.stringify(result.rows));
		      callback();
		    });
		  	
		  }
	});
};
exports.getMapById = function(id,callback){
	pg.connect(conString, function(err, client) {
		  if (err) {
		    console.log(err);
		  } else {

		    client.query("select * from map where mapid = "+id, function(err, result) {
		    	console.log(result.rows[0]); 
		      //output = (JSON.stringify(result.rows));
		      callback(result.rows[0]);
		    });
		  	
		  }
	});
};

exports.getIcon = function(req,callback){
	pg.connect(conString, function(err, client) {
		  if (err) {
		    console.log(err);
		  } else {

		    client.query("select icon,name,path from icon order by icon;", function(err, result) {
		      console.log("Row count: %d",result.rows.length);
		      output = (JSON.stringify(result.rows));
		      callback();
		      
		    });

		  }
	});
};
exports.getUser = function(req,callback){
	pg.connect(conString, function(err, client) {
		  if (err) {
		    console.log(err);
		  } else {

		    client.query("select userid,name,gropu from user order by userid;", function(err, result) {
		      console.log("Row count: %d",result.rows.length);
		      output = (JSON.stringify(result.rows));
		      callback();
		      
		    });

		  }
	});
};

exports.getSchool = function(callback){
	pg.connect(conString, function(err, client) {
		  if (err) {
		    console.log(err);
		  } else {

		    client.query("select ogc_fid,esn from area2 where ccd = '23101';", function(err, result) {
		      console.log("Row count: %d",result.rows.length);
		      var school = {};
		      for(var i = 0;i<result.rows.length;i++){
		    	  school[result.rows[i]["ogc_fid"]] = result.rows[i]["esn"];
		    	  //console.log("Row count: %s",result.rows[i]["esn"]);
		      }
		      callback(school);
		      
		    });

		  }
	});
};



exports.postPOI = function(req,callback){
	pg.connect(conString, function(err, client) {
		  if (err) {
			    console.log(err);
			  } else {
				  var name = req.param("name");
				  var address = req.param("address");
				  var geom = req.param("geom");
				  var userid = req.param("userid");
				  var comment = req.param("comment");
				  var icon = req.param("icon");
				  var sql = "insert into poi (name,userid,address,icon,geom) values ('"+name+"',"+parseInt(userid)+",'"+address+"',"+parseInt(icon)+","+geom+");";
				  console.log(sql);
				  client.query(sql, function(err, result) {
					  console.log(err);
			      output = (JSON.stringify(result));
			      //callback();
			    });
		
			  }
	});
};


exports.postMap = function(req,callback){
	pg.connect(conString, function(err, client) {
		  if (err) {
			    console.log(err);
			  } else {
				  var name = req.param("name");
				  var ogc_fid = req.param("schoolid");
				  var style = req.param("stylename");
				  var owner = req.param("owner");
			
				  var sql = "insert into map (name,ogc_fid,style,owner) values ('"+name+"',"+parseInt(ogc_fid)+",'"+style+"','"+owner+"');";
				  console.log(sql);
				  client.query(sql, function(err, result) {
					  console.log(result);
			      //output = (JSON.stringify(result));
			      callback();
			    });
		
			  }
	});
};

