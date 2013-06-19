define([
	"backbone",
	"text!../../templates/book.html"
],

function ( Backbone, tpl ) {

	var Book = Backbone.View.extend({


		toggleVisible: function() {
			this.$el.toggleClass( "hidden", this.isHidden() );
		},

		isHidden: function() {
			var bookFilter = window.library.common.bookFilter,
					isCompleted = this.model.get( "completed" );

			return (
				( bookFilter === "reading" && isCompleted )
				|| ( bookFilter === "completed" && !isCompleted )
			);

		}

	});

	return Book;

});