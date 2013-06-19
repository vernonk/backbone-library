define([
	"backbone"
],

function ( Backbone ) {

	var Router = Backbone.Router.extend({

		routes: {
			"": "main",
			":type(/)": "setFilter",
			"*path": "catchAll"
		},

		main: function () {
			window.library.common.bookFilter = "";
			window.library.collections.books.trigger( "filter" );
		},

		setFilter: function ( param ) {
			window.library.common.bookFilter = param.trim() || "";
			window.library.collections.books.trigger( "filter" );
		},

		catchAll: function ( path ) {
			var parts = path.split( "/" );
			console.log( "Catch-all! Path: " + path );
			console.log( parts );
		}

	});

	return Router;

});