define([
	"backbone"
],

function ( Backbone ) {

	var Book = Backbone.Model.extend({

		defaults: {
			title: "TBD",
			author: "",
			img: "placeholder.gif",
			completed: false
		},

		toggleStatus: function () {
			this.save({
				completed: !this.get( "completed" )
			},
			{
				success: function ( model ) {
					model.trigger( "visible" );
				}
			});
		}

	});

	return Book;

});