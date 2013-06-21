Backbone Library App
================

This is a simple app that we'll build together at CharlotteJS meetup on June 20, 2013. The library app uses localStorage for our store.


## Walkthrough Steps

If you want to work off of the `build-out` branch to try and build the app yourself, here are steps you'll need to follow for each piece. Consult the [Backbone Docs](http://backbonejs.org) if you need refreshers on some of the methods.

### Model (js/models/book.js)

1. Make sure new model instances of default values:
	- `title` _String_
	- `author` _String_
	- `img` _String_ Can use `placeholder.gif`
	- `completed` _Boolean_
1. Create a `toggleStatus` method
	- This method should toggle the value of the `completed` property and use `save` to save your method.
	- Your `save` call should also include a `success` callback handler that triggers the `visible` event on the model.

### Collection (js/collections/books.js)

1. Create your collection class using `Book` for your model
	- `Book` is the variable passed in to our module definition using RequireJS. This is a reference to the new model class we created in the first step.
1. Set up a new store, since this is just specific to our storage here is the code you will need to use:
	- `localStorage: new Store( "anidentifier" )`
	- This just sets up our collection to use Backbone.localStorage
1. Set up your `comparator` property to sort the collection by `completed`.

### Book Model View (js/views/book.js)

1. Use an `li` as the view element and make sure its class attribute contains `book span4`
1. Create your template property and use Underscore's `template` method using `tpl` as the content.
	- `tpl` is a variable defined in our module definition. This is a reference to our template in `/templates/book.html` if you want to reference the code.
1. Set up your events object to manage the view's DOM events. The list below is in an "event selector : callbackName" format.
	- `"click .togglestatus" : "toggleStatus"`
	- `"click .destroy": "removeBook"`
1. Create your `initialize` method and inside set up listeners for model events. The list below is in "modelevent : methodName" format.
	- `change : render`
	- `destroy : remove`
	- `visible : toggleVisible`
1. Create your `render` method. In this method you'll need to use your template method to hand off your model's attributes and append them to the view element.
1. Create a `toggleStatus` method ( it should accept one argument for the event object )
	- First off, `preventDefault` on the event (if there was a fallback URL we want to make sure we prevent it from loading).
	- Now, call our model's `toggleStatus` method.
- Create a `removeBook` method. In this method, we simply need to destroy the model.

### Books Collection View (js/views/books.js)

1. Use the existing `.bookshelf` element for your view element
1. Create your `initialize` method and set up your collection event listeners and fetch the collection ( remember to pass `{ reset: true }` to `fetch` so that the `reset` event fires )
	- Set up your collection event listeners (list is in "collectionevent : methodName" format):
		- `add : render`
		- `reset : addBooks`
	- Call `fetch` on your collection
1. Create your `render` method (hint: you'll need to pass `model` in as a parameter)
	- Inside of `render` create a new `BookView` instance and render it. 
		- `BookView` is a variable defined in our module definition that references our model view that we created.
	- Append your new view instance element to the collection view element.
1. Create an `addBooks` method
	- In this method, you'll need to empty the current view element's HTML
	- You'll also need to utilize one of Underscore's proxied methods to iterate over our collection list. On each model in the collection, call our `render` method. (hint: if you use `forEach` don't forget to pass your `this` context)

### Application View (js/views/app.js)

1. Use the existing `.app` element for your view element
1. Set up your events object to manage the view's DOM events. The list below is in an "event selector : callbackName" format.
	- `"click a" : "filterBooks"`
	- `"click li.add a" : "showForm"`
	- `submit: "createBook"`
1. Create your `initialize` method and do the following:
	- Go ahead and set up a couple cached jQuery objects that you can use throughout your view:
		- `this.$filterBar` - Should cache a jQuery collection for `.nav-pills`. 
		- `this.$addForm` - Should cache a jQuery collection for `.addForm`.
		- Remember, you can use `$el` to execute scoped jQuery object methods.
	- Set up a collection event listener that will listen for the `filter` event and call our `filterBooks` method.
1. `render` is already created and filled out. This will keep track of our filter bar state as we step through the app to ensure that it matches current state.
1. Create the `filterBooks` method and do the following:
	- Use one of Underscore's proxied methods to iterate over the collection. On each model, trigger the `visible` event (hint: don't forget to pass your `this` context if you use `forEach`)
	- At the end of your method, call `render` (to make sure our filter bar is in active state)
1. Create the `createBook` method that will be used when the "Add Book" form is submitted. Do the following in your function body:
	- First off prevent the default form submission.
	- Then use `create` convenience function to create a new model instance. To get the object of attributes to use for your new instance, you can call `this.newAttrs()` which is set up already for you.
	- On the very last line of your method, call `this.$addForm.modal( "hide" )`. This is simply to hide our add a book form.
1. There are a couple more methods that are already in the app view file, here's a brief explanation of both:
	- `showForm` - This is just going to show our modal to add a new book when the "Add a book" link is clicked.
	- `newAttrs` - This is a convenience function to get all the form data being submitted in our new book form.

### Application Constructor (js/app.js)

Now we want to set up our Application constructor. The constructor function is already defined in the file, we just need to create a few properties that each instance of our application will share.

Below where the steps mention to create a new instance, the variable reference is what we've defined in our RequireJS definition function. These names relate to the collection and views that we've required as a dependency in our app.

1. Create a `this.collections.books` property and create a new `Books` collection instance.
1. Create a `this.views.books` property and create a new `BooksView` view instance (don't forget to pass our new collection above to our new view instance).
1. Create a `this.views.app` property and create a new `AppView` view instance (don't forget to pass our new collection above to our new view instance).
1. Create a `this.common.bookFilter` property and assign it the value of an empty string for now. This is what we'll use to keep track of filter state across our app.
1. The last step is inside of the piece that is already filled out for you about localStorage. Inside that snippet you'll see `"youridentifier"`. Just replace that string with whatever identifier name you chose when creating your new store on your collection.

### Router (js/router.js)

1. Create your Router class.
2. Add a routes object that has 3 routes:
	- `""` that will be used as our main route that should call `main`
	- `":type(/)"` that will be used for our filter and should call `setFilter`
	- `"*path"` to see how we can use a catch all route.
3. Create our methods that we'll use when the routes above are matched:
	- `main`
		- Set `window.library.common.bookFilter` to an empty string.
			- You may be wondering where `window.library` comes from. We'll define that in our next step, but it simply refers to the new `App` instance that we create. We'll store it as a global so that we can reference it throughout our application.
		- Trigger `filter` on the collection (you'll access the collection at `window.library.collections.books`)
	- `setFilter`
		- This method should accept a parameter that matches what our route matched.
 		- Set `window.library.common.bookFilter` to equal the argument passed in to the method.
 		- Trigger `filter` on the collection (you'll access the collection at `window.library.collections.books`)
	- `catchAll`
		- This method is just to show what the catch-all route path looks like when using a *splat.
			- `console.log` the path argument that gets passed in to the method

### App Kickoff! (js/main.js)

Down to the last step and just a few things to do here. At the top of this file is the RequireJS configuration for our app.  You'll want to scroll down to where you see the comment `// Kick off our app` and that's where you'll do your work. The snippet below shows where your code will go.

		// Kick off our app
		require( [
			"app",
			"router"
		],
		function( App, Router ) {
			// YOUR CODE WILL GO HERE
		});

There are 3 final steps that we need to do:

1. Create a new `App` instance on `window.library`
1. Create a new `Router` instance on `window.library.router`
1. Tell Backbone.History to `start` watching for changes.

### All done!

You should now be able to load your app in a browser and have a fully functional app that can add new books, delete books, and toggle the read status.

That doesn't mean you have to be done though! Extend the app more. Maybe enable the books to be edited? Perhaps drag-and-drop ordering? You're in control now. This could be the greatest library (you know one that catalogs books) that anyone has ever seen.
