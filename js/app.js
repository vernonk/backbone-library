define( [
	"collections/books",
	"views/books",
	"views/filter",
	"data"
],
function ( Books, FilterView, BooksView, data ) {

	var App = function () {
		
		this.collections.books = new Books();

		this.views.books = new BooksView({
			collection: this.collections.books
		});

		this.views.filter = new FilterView({
			collection: this.collections.books
		});

		this.common.bookFilter = "";
		
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
