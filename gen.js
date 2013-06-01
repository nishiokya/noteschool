var pg = require('pg');
var conString = "tcp://postgres:@localhost:5432/school";

var insertSchool = function(err, result,geom){
	console.log(geom);	
};

pg.connect(conString, function(err, client) {
	  if (err) {
	    console.log(err);
	  } else {

	    client.query("select ST_ASTEXT(wkb_geometry),* from school ", function(err, result) {
	      console.log("Row count: %d",result.rows.length);
	      console.log(result.rows[0]["ccd"]);
	      for(var i =0;i< result.rows.length;i++){
	    	  //console.log(result.rows[i]["ccd"]);
	    	  //var query = "select ogc_fid,ST_ASGeoJSON(wkb_geometry),ccd,ins,esn,ads from area2 where esn = '"+result.rows[i]["esn"]+"'  and ST_WITHIN(ST_GeomFromText ('"+result.rows[i]["st_astext"]+"'), wkb_geometry);";
	    	  var query = "update area2 set point =ST_GeomFromText ('"+result.rows[i]["st_astext"]+"',4326) where esn = '"+result.rows[i]["esn"]+"'  and ST_WITHIN(ST_GeomFromText ('"+result.rows[i]["st_astext"]+"'), wkb_geometry);";
	    	  //console.log(query);
	    	  client.query(query);
	    	  //st_astext = result.rows[i]["st_astext"];
	    	  //console.log(st_astext);
	    	  /*
	    	  client.query(query, function(err, result2,st_astext) {
	    		  console.log(st_astext);
	    	      if(err){
	    	    	  console.log(err);
	    	      }else{
	    		  //console.log("Row count: %d",result2.rows.length);
	    		  	if(result2.rows.length > 1){
	    		  		console.log("Row count: %d %s",result2.rows[0]["ccd"],result2.rows[0]["esn"]);
	    		  		console.log("Row count: %d %s",result2.rows[1]["ccd"],result2.rows[1]["esn"]);
	    		  	}else if(result2.rows.length == 1){
	    		  		var query2  = "update area2 set point =  ST_GeomFromText ('"+st_astext+"',4326) where  ogc_fid = " + result2.rows[0]["ogc_fid"];
	    		  		//console.log(query2);
	    		  	}
	    	      }
	    	  });
	    	  */
	    	  
	      }
	    });

	  }
});