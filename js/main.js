'use strict';

require.config({
	paths: {
		"jquery": "../components/jquery/jquery.min",
		"underscore": "../components/underscore/underscore-min",
		"backbone": "../components/backbone/backbone-min",
		"backboneLocalStorage": "../components/backbone.localStorage/backbone.localStorage-min",
		"text": "../components/requirejs-text/text",
		"bootstrap": "../components/bootstrap/js/bootstrap.min"
	},
	shim: {
		"underscore": {
			exports: "_"
		},
		"backbone": {
			deps: [
				"underscore",
				"jquery"
			],
			exports: "Backbone"
		},
		"bootstrap": [ "jquery" ]
	}
});

// Kick off our app
require( [
	"app",
	"router"
],
function( App, Router ) {


	
});

