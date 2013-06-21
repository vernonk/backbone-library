$( document ).bind( "mobileinit", function () {
	$.mobile.focusPage = function ( page ) {
		var autofocus = page.find( "[autofocus]" ),
			pageTitle = page.find( ".ui-title:eq(0)" );

		if ( autofocus.length ) {
			autofocus.focus();
			return;
		}

		if ( pageTitle.length ) {
			pageTitle.focus();
		}
	};
	$( document ).ready( function () {
		$( "body" )
			.html( window.parent.getMobileContent() );

		var styleTemplate = [
			"<style>",
				"html, body, [data-role=page] { width: " + window.parent.getMobileWidth() +  "px !important; }",
			"</style>"
			].join("\n");
		$( "head" ).append( styleTemplate );
	})

	$( document ).one( "pageshow", function () {
		window.parent.mobileContentRendered();
	});
});