/*\
title: $:/macros/tiddlywiki/getlabels.js
type: application/javascript
module-type: macro
\*/
(function(){
/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";
/*
Information about this macro
returns value of key in a data json tiddler
note that macros are not connected with the refresh mechanism -use with caution.
*/
exports.name = "getlabels";

exports.params = [
{ name: "paramString" }
];
/*
Run the macro
*/
exports.run = function(paramString) {
	var params =JSON.parse(paramString);
	var labelarray = {};
    var t;
   	var numTabs = (params.length-1)/3;
	for(t=0; t<numTabs; t++) {
		var contentName = params[t*3+3].value;
		labelarray[contentName] = params[t*3+1].value;
	} 
	//Create a list of names (tiddlers, tiddler/sections, tiddler/slices), and create maps from name -> label and name -> prompt
	//Use json to implement maps 
	return JSON.stringify(labelarray);
};
function parserparams(paramString) {
	var params = [],
		reParam = /\s*(?:([A-Za-z0-9\-_]+)\s*:)?(?:\s*(?:"""([\s\S]*?)"""|"([^"]*)"|'([^']*)'|\[\[([^\]]*)\]\]|([^"'\s]+)))/mg,
		paramMatch = reParam.exec(paramString);
	while(paramMatch) {
		// Process this parameter
		var paramInfo = {
			value: paramMatch[2] || paramMatch[3] || paramMatch[4] || paramMatch[5] || paramMatch[6]
		};
		if(paramMatch[1]) {
			paramInfo.name = paramMatch[1];
		}
		params.push(paramInfo);
		// Find the next match
		paramMatch = reParam.exec(paramString);
	}
	return params;
}
})();
