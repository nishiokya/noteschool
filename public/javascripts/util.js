
var schoolarea = null;
var stylemaplayer;  //スタイル地図レイヤー
var layerset;       //レイヤーセット

var styledata = [
{"label":true},
{"figure":true},
{"city":true},
{"prefecture":true},
{"area_name":true},
{"gs":true},
{"roadside_station":true},
{"traffic_facility":true},
{"line_comment":true},
{"road_name":true},
{"symbol":true},
{"road":true},
{"boundary":true},
{"water":true}
];


var drawSchool = function(data){

	for(var i=0;i<data.length;i++){
       	 var geojson =eval("("+data[i]["st_asgeojson"]+")");
       	 var poly =geojson["coordinates"][0];
       	 
       	 geojson =eval("("+data[i]["point"]+")");

       	 var latlngs = [];
       	
       	var maxlat = maxlon =0;
       	var minlat = minlon = 180;
       	
       	var maxlatoffset= 0;
       	for(var j=0;j<poly.length;j++)
      	 {

      		 if( poly[j][1] > maxlat){
      			maxlat = poly[j][1];
      			maxlatoffset = j;
      		 }
      		if( poly[j][1] < minlat){
      			minlat = poly[j][1];
      		 }
      		if( poly[j][0] > maxlon){
      			maxlon = poly[j][0];

      		 }
      		if( poly[j][0] < minlon){
      			minlon = poly[j][0];
      		 }
      	 }
       	
       	var h = w = 0.001;
  

       	
       	latlngs.push(new Y.LatLng(maxlat+h,minlon-w));
       	latlngs.push(new Y.LatLng(maxlat+h,poly[maxlatoffset][0]));
 
           
       	 for(var j=maxlatoffset;j>=0;j--)
       	 {

       		 latlngs.push(new Y.LatLng(poly[j][1],poly[j][0]));
       	 }
       	for(var j=poly.length-1;j>=maxlatoffset;j--)
      	 {

      		 latlngs.push(new Y.LatLng(poly[j][1],poly[j][0]));
      	 }
       	latlngs.push(new Y.LatLng(maxlat+h,poly[maxlatoffset][0]));
       	latlngs.push(new Y.LatLng(maxlat+h,maxlon+w));
       	latlngs.push(new Y.LatLng(minlat-h,maxlon+w));
       	latlngs.push(new Y.LatLng(minlat-h,minlon-w));
       	
       	 if(schoolarea != null){
       		ymap.removeFeature(schoolarea);
       	 }
       
       	schoolarea = new Y.Polygon(latlngs,{
       	                //strokeStyle: new Y.Style("ff0000", 4, 0.7),
       	                fillStyle: new Y.Style("555555", null, 0.2)
       	            });
       	ymap.addFeature( schoolarea );
       	ymap.drawMap(schoolarea.getLatLng(),15);

       
       	    	
        }
};

function set(schoolid) {
	ogrid = schoolid;
    $.getJSON("/api/school/"+schoolid, drawSchool );
}