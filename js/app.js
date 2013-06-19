define( [
	"collections/books",
	"views/books",
	"views/app",
	"data"
],
function ( Books, BooksView, AppView, data ) {

	var App = function () {
		
		
		// Populating our storage with pseduo data
		if( !localStorage.getItem( "charlottejs" ) ) {
			_.forEach( data.books, function ( book ) {
				this.collections.books.create( book );
			}, this);
		}
	};

	App.prototype = {
		views: {},
		collections: {},
		common: {}
	};

	return App;

});
