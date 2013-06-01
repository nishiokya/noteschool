var ymap;
var schoolarea = null;
var yroute = null;
var getIcon = function(){
    $.getJSON("icon", function(data){
    	var html ="";
    	for(var i=0;i<data.length;i++){
    		
    		var d = data[i];
    		html += d["icon"]+" "+ d["name"]+" "+d["path"]+"<br>";
    		$("#iconlist").append(jQuery("<option value='"+d["icon"]+"'>"+d["name"]+"</option>"));
    	}
    	
    	//$("#iconlist").html(html);

	});
};
//http://navi.olp.yahooapis.jp/OpenLocalPlatform/V1/routeSearch?callback=jquery1347889765283&arnum=1&output=json&traffic=walk&coordinates=139.7311%2C35.6694%2C139.731%2C35.66572&appid=D_KP2Maxg65ULY8iGPzdIAZ4zGseyKAu9z0DNA7xDKJX8LwkHgV3fX9p1E4Udw--&_=1347889766266
$(document).ready(function () {

	getIcon();
	
	$("#iconlist").bind('change', function() {
		//alert($('#iconlist option:selected').val());
		$("#icon").val($('#iconlist option:selected').val());
	});
	
	ymap = new Y.Map("map");
	ymap.drawMap(new Y.LatLng(35.1846,136.9724 ), 17, Y.LayerSetId.NORMAL);
	ymap.setConfigure('scrollWheelZoom',true);
	ymap.addControl( new Y.LayerSetControl() );
	ymap.addControl( new Y.ScaleControl() );
	ymap.addControl( new Y.SliderZoomControlVertical() );

	var ysearch = new Y.SearchControl();
	ymap.addControl(ysearch);
	
	ymap.bind('click', function(latlng){
	    var  coordinate= (latlng.toString());
	    $("#geom").val("ST_GeomFromText('POINT("+latlng.lng()+" "+latlng.lat()+")', 4326)");
	    
	
	    var request = { "latlng": latlng };

	    var geocoder = new Y.GeoCoder();
	    geocoder.execute( request , function( ydf ) {
	        if ( ydf.features.length > 0 ) {
	            var feature = ydf.features[0];

	            $("#address").val(feature.property.Address);
	        }
	    } );

	    
	});
	
	


});