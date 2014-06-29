/*\
title: $:/macros/tiddlywiki/getcookie.js
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
exports.name = "getcookie";

exports.params = [
{ name: "paramString" }
];
/*
Run the macro
*/
exports.run = function(paramString) {
	var params = JSON.parse(paramString);
	var cookie = params[0].value;
	return cookie;
}
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