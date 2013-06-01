var db = require('../postgis');
var async = require('async');
/*
 * GET home page.
 */

exports.index = function(req, res){
	
	  school = db.getSchool(function(school){
		  var maps = {"standard":"スタンダード",
		            "vivid":"ビビッド",
		            "bold":"ボールド",
		            "simple":"シンプル",
		            "monotone":"モノトーン",
		            "red":"レッド",
		            "orange":"オレンジ",
		            "yellow":"イエロー",
		            "yellowishgreen":"イエローグリーン",
		            "green":"グ",
		            "aquamarine":"アクアマリン",
		            "lightblue":"ライトブルー",
		            "blue":"ブルー",
		            "bluepurple":"ブルーパープル",
		            "purple":"パープル",
		            "pink":"ピンク",
		            "peach":"ピーチ",
		            "brown":"ブラウン",
		            "gray":"グレー",
		            "midnight":"ミッドナイト",
		            "railway":"鉄道路線",
		            "topographic":"地形図",
		            "waters":"水域図",
		            "district":"行政色分け図",
		            "hybridPhoto":"ハイブリッドON"};
	    res.render('index', {  school:school,maps:maps });
	  });

};

exports.testPoi = function(req, res){
	  res.render('testUpload', { title: 'Express' });
	};