define([
	"backbone",
	"bootstrap"
],

function ( Backbone ) {

	var App = Backbone.View.extend({



		render: function (e) {
			// Let's make sure the active filter matches state
			// empty, reading, completed
			var bookFilter = window.library.common.bookFilter,
					anchor = ( bookFilter ) ? "a[href$='" + bookFilter + "']" : "a[href='#/']";

			// Traverse and add class to appropriate li
			this.$filterbar
				.find( "li" )
					.removeClass( "active" )
					.find( anchor )
						.closest( "li" )
							.addClass( "active" );
		},

		// just creating our modal for the add form
		showForm: function () {
			this.$addForm.modal();
		},

		// getting the attrs from the form to use for our new book
		newAttrs: function() {
			var data = {}, $addForm = this.$addForm;
			data.title = _.escape( $addForm.find( "[name='title']" ).val() ) || null;
			data.author = _.escape( $addForm.find( "[name='author']" ).val() ) || null;
			data.img = _.escape( $addForm.find( "[name='img']" ).val() ) || null;
			data.completed = $addForm.find( "[name='completed']" ).is( ":checked" );
			return data;
		}

	});

	return App;

});