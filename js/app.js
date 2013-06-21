define( [
	"collections/books",
	"views/books",
	"views/app",
	"data"
],
function ( Books, BooksView, AppView, data ) {

	var App = function () {
		
		this.collections.books = new Books();

		this.views.books = new BooksView({
			collection: this.collections.books
		});

		this.views.app = new AppView({
			collection: this.collections.books
		});

		this.common.bookFilter = "";
		
		// Populating our storage with pseduo data
		if( !localStorage.getItem( "youridentifier" ) ) {
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
