define([
	"backbone",
	"text!../../templates/book.html"
],

function ( Backbone, tpl ) {

	var Book = Backbone.View.extend({

		tagName: "li",
		className: "book span4",

		template: _.template( tpl ),

		events: {
			"click .togglestatus": "toggleStatus",
			"click .destroy": "removeBook"
		},

		initialize: function () {

			this.listenTo( this.model, "change", this.render );
			this.listenTo( this.model, "destroy", this.remove );
			this.listenTo( this.model, "visible", this.toggleVisible );

		},

		render: function () {
			this.$el.html( this.template( this.model.attributes ) );
			return this;
		},

		toggleStatus: function ( e ) {
			e.preventDefault();
			this.model.toggleStatus();
		},

		removeBook: function() {
			this.model.destroy();
		},

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