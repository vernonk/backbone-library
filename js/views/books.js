define([
	"jquery",
	"backbone",
	"views/book"
],

function ( $, Backbone, BookView ) {

	var Books = Backbone.View.extend({

		el: ".bookshelf",

		initialize: function () {

			this.listenTo( this.collection, "add", this.render );
			this.listenTo( this.collection, "reset", this.addBooks );

			this.collection.fetch( { reset: true } );

		},

		render: function ( book ) {
			var bookView = new BookView( { model: book } ).render();
			this.$el.append( bookView.el );
		},

		addBooks: function () {
			this.$el.html( "" );
			this.collection.forEach( this.render, this );
		}

	});

	return Books;

});