var ymap;
var schoolarea = null;
var yroute = null;
var getSchool = function(coordinate){
    $.getJSON("area/"+coordinate, function(data){

        for(var i=0;i<data.length;i++){
       	 var geojson =eval("("+data[i]["st_asgeojson"]+")");
       	 var poly =geojson["coordinates"][0];
       	 
       	 geojson =eval("("+data[i]["point"]+")");
       	 var spoint =geojson["coordinates"];   	 
       	 
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
       	
       
       	//var h = maxlat-minlat;
       	//var w = maxlon -minlon;
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
       	            $('#dialogDiscription').html(data[i]["ccd"]+"<br>"
       	            		+data[i]["ins"]+"<br>"+data[i]["ads"]+"<br>");
       	            $('#dialog').dialog( "option" , "title" ,data[i]["esn"] );
       	            $('#dialog').dialog('open');
       	         
       	      
       	      var epoint = coordinate.split(",");
       	      var routeparam = spoint[0]+","+spoint[1]+","+epoint[1]+","+epoint[0];
       	      var routes = [
       	                     new Y.LatLng(spoint[1],spoint[0]),  //東京駅
       	                     new Y.LatLng(epoint[0],epoint[1])   //新宿駅
       	                  ];
       	      var config = {
       	    	    "traffic":"walk"
       	    	};
       	    	//RouteSearchLayerオブジェクトをMapオブジェクトに追加します。
       	        if (yroute != null)
       	        	ymap.removeLayer(yroute);
       	        
       	    	yroute = new Y.RouteSearchLayer();
       	    	ymap.addLayer(yroute);
       	    	//経路の地点をexecuteメソッドの引数として渡して呼び出します。
       	    	yroute.execute(routes,config);
       	    	$.getJSON("http://navi.olp.yahooapis.jp/OpenLocalPlatform/V1/routeSearch?callback=?&arnum=1&output=json&traffic=walk&coordinates="+routeparam+"&appid=D_KP2Maxg65ULY8iGPzdIAZ4zGseyKAu9z0DNA7xDKJX8LwkHgV3fX9p1E4Udw--", function(data){
       	    		var  TotalDistance = data["ResultInfo"]["Description"]["TotalDistance"];
       	    		var  TotalTime = data["ResultInfo"]["Description"]["TotalTime"];
       	    		$('#dialogDiscription').append( "<br>学校までの距離:"+TotalDistance);
       	    		$('#dialogDiscription').append( "<br>学校までの時間:"+TotalTime);
       	    	});
       	    	
        }

       });
};
//http://navi.olp.yahooapis.jp/OpenLocalPlatform/V1/routeSearch?callback=jquery1347889765283&arnum=1&output=json&traffic=walk&coordinates=139.7311%2C35.6694%2C139.731%2C35.66572&appid=D_KP2Maxg65ULY8iGPzdIAZ4zGseyKAu9z0DNA7xDKJX8LwkHgV3fX9p1E4Udw--&_=1347889766266
$(document).ready(function () {
	$('#dialog').dialog({
		  autoOpen: false,
		  title: 'jQuery Dialog Demo',
		  closeOnEscape: false,
		  modal: false,
		  position:["right","top"],
		  buttons: {
		    "OK": function(){
		      $(this).dialog('close');
		    }
		  }
		});
	
	ymap = new Y.Map("map");
	ymap.drawMap(new Y.LatLng(35.1846,136.9724 ), 17, Y.LayerSetId.NORMAL);
	ymap.setConfigure('scrollWheelZoom',true);
	ymap.addControl( new Y.LayerSetControl() );
	ymap.addControl( new Y.ScaleControl() );
	ymap.addControl( new Y.SliderZoomControlVertical() );

	ymap.addLayerSet("railway" , new Y.LayerSet("鉄道",[new Y.StyleMapLayer("railway")],{"maxZoom":20,"minZoom":11}) );
	ymap.addLayerSet("district" , new Y.LayerSet("行政色分け",[new Y.StyleMapLayer("district")],{"maxZoom":20,"minZoom":11}) );
	ymap.addLayerSet("blankmap", new Y.LayerSet("白地図",[new Y.BlankMapLayer()],{"maxZoom":20,"minZoom":11}));
	var ysearch = new Y.SearchControl();
	ymap.addControl(ysearch);
	
	ymap.bind('click', function(latlng){
	    var  coordinate= (latlng.toString());
	    getSchool(coordinate);
	});
	
	


	var  coordinate =  ymap.getCenter().toString() ;
	getSchool(coordinate);

});