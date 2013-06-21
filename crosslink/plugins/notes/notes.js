define( [ "js/app/app", "jquery", "underscore", "hotkeys" ], function ( app, $, _, hotkeys ) {

	var deck, $slide, $notes;

	notes = {
		name: "Notes",

		initialize: function () {
			var context = this;
			var noop = function() {};

			_.bindAll( context, "render" );

			_.each( [ "log", "dir", "warn", "group", "groupEnd" ], function( method ) {
				if ( !window.console[ method ] ) {
					window.console[ method ] = noop;
				}
			});

			deck = app.deck;

			deck.bind( "change:current", this.hide );
			deck.bind( "change:current", this.changeSlide );
			deck.bind( "change:current", this.log );

			app.once( "app.bindings", this.bindings );
			app.once( "slides.rendered", this.render );
			app.utils.addLink( "crosslink/plugins/notes/notes.css" );

			app.subscribe( "app.key.notes", this.toggle );
		},

		bindings: function( bindings ) {
			_.extend( bindings, {
				"n": "notes"
			});
		},

		render: function ( message ) {
			// TODO: Insert note indicator
		},

		changeSlide: function ( slidedeck, value ) {
			$slide = $( "#slide-" + value );
			$notes = $slide.find( "aside.notes" );

			$slide.find( "footer .page-no" ).toggleClass( "notes", !!$notes.length );
		},

		log: function() {
			console.group( $slide.attr( "id" ) );
			console.log( $slide.find( "header" ).text() );
			console.log( $notes.html() );
			console.groupEnd();
		},

		toggle: function() {
			$notes.slideToggle( "slow" );
		},

		hide: function() {
			$notes && $notes.slideUp( "slow" );
		}
	};

	return notes;
});