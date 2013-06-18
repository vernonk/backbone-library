define([
	"backbone",
	"bootstrap"
],

function ( Backbone ) {

	var App = Backbone.View.extend({

		el: ".app",

		events: {
			"click a": "filterBooks",
			"click li.add a": "showForm",
			submit: "createBook"
		},

		initialize: function () {
			this.$filterbar = this.$el.find( ".nav-pills" );
			this.$addForm = this.$el.find( ".addForm" );

			this.listenTo( this.collection, "filter", this.filterBooks );
		},

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

		filterBooks: function () {
			this.collection.forEach( function( book ) {
				book.trigger( "visible" );
			}, this );
			this.render();
		},

		showForm: function () {
			this.$addForm.modal();
		},

		createBook: function ( e ) {
			e.preventDefault();
			this.collection.create( this.newAttrs() );
			this.$addForm.modal( "hide" );
		},

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