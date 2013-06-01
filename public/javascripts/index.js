var ymap;            //地図オブジェクト


var ogrid ;
var stylename = "standard";
var owner ="nishioka";



//http://navi.olp.yahooapis.jp/OpenLocalPlatform/V1/routeSearch?callback=jquery1347889765283&arnum=1&output=json&traffic=walk&coordinates=139.7311%2C35.6694%2C139.731%2C35.66572&appid=D_KP2Maxg65ULY8iGPzdIAZ4zGseyKAu9z0DNA7xDKJX8LwkHgV3fX9p1E4Udw--&_=1347889766266
$(document).ready(function () {
	$('#dialog').dialog({
		  autoOpen: true,
		  title: '新規作成',
		  closeOnEscape: false,
		  modal: false,
		  position:["right","top"],
		  buttons: {
		    "OK": function(){
		      $(this).dialog('close');
		    }
		  }
		});
	

	ymap = new Y.Map("map",{"configure":{"scrollWheelZoom":true}});
	ymap.addControl(new Y.LayerSetControl());
	ymap.addControl(new Y.SliderZoomControlHorizontal());
	ymap.addControl(new Y.CenterMarkControl());

    //スタイル地図レイヤーを生成します。
    stylemaplayer = new Y.StyleMapLayer("simple");
    setStyle();
    //レイヤーセットを作成します。
    layerset = new Y.LayerSet("スタイル地図", [stylemaplayer]);
    //Mapオブジェクトにレイヤーセットを追加します。
    ymap.addLayerSet("stylemap",layerset);
    //標準地図レイヤーをレイヤーセットから削除します。
    ymap.removeLayerSet(Y.LayerSetId.NORMAL);
    //地図を描画します。
    ymap.drawMap(new Y.LatLng(35.662484, 139.734222), 15 , "stylemap");
    
    
    $("#exec").click(function () {
    	//alert("aa");
    	$.ajax({
    		type: 'post',
    		url: 'api/map',
    		data: {
    			'name': name,
    			schoolid : ogrid,
    			name:$("#textbox").val(),
    			stylename:stylename,
    			owner:owner,
    			mode:1,
    		},
    		success: function(data){
    			alert(data);
    		}
    	});
	});


});

function regist(){
	
	
}
/**
 * スタイルを設定します。
 */
function setStyle() {
    var param = styledata;
    if(param.indexOf(";") != -1) param="";
    if(param.indexOf("(") != -1) param="";
    if(param.indexOf(")") != -1) param="";
    var style = "";
    if(param != "") style = eval(param);
    //スタイルを設定します。
    stylemaplayer.setStyle(style);
}
/**
 * 図式を設定します。
 */
function setBase(basename) {
    stylename = basename;
    if (basename == "hybridPhoto") {
        //航空写真のハイブリッド表現を有効にします。
    	ymap.setConfigure("hybridPhoto",true);
        //レイヤーセットを航空写真に切り替えます。
        if (ymap.getCurrentLayerSetId() != Y.LayerSetId.PHOTO) {
        	ymap.setLayerSet(Y.LayerSetId.PHOTO);
        }
    } else {
        //航空写真のハイブリッド表現を無効にします。
    	ymap.setConfigure("hybridPhoto",false);
        //レイヤーセットからスタイル地図レイヤーを削除します。
        layerset.removeLayer(stylemaplayer);
        //選択された図式名で新しくスタイル地図レイヤーを作成します。
        stylemaplayer = new Y.StyleMapLayer(basename);
        //作成したスタイル地図レイヤーをレイヤーセットに追加します。
        layerset.addLayer(stylemaplayer);
        //地図を再描画します。
        ymap.redraw(true);
        //レイヤーセットをスタイル地図に切り替えます。
        if (map.getCurrentLayerSetId() != "stylemap") {
        	ymap.setLayerSet("stylemap");
        }
    }
    setStyle();
}


