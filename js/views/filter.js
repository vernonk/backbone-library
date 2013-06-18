define([
	"backbone",
	"bootstrap"
],

function ( Backbone ) {

	var Filter = Backbone.View.extend({

		el: ".nav-pills",

		events: {
			"click a": "filterBooks"
		},

		initialize: function () {
			this.listenTo( this.collection, "filter", this.filterBooks );
		},

		render: function (e) {
			// Let's make sure the active filter matches state
			// empty, reading, completed
			var bookFilter = window.library.common.bookFilter,
					anchor = ( bookFilter ) ? "a[href$='" + bookFilter + "']" : "a[href='#/']";

			// Traverse and add class to appropriate li
			this.$el
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
		}


	});

	return Filter;

});