define([
	"backbone",
	"backboneLocalStorage",
	"models/book"
],

function ( Backbone, Store, Book ) {

	var Books = Backbone.Collection.extend({

		model: Book,

		localStorage: new Store( "charlottejs" ),

		comparator: "completed"

	});

	return Books;

});