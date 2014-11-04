'use strict';

// Configuring the Articles module
angular.module('articles').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Articles', 'articles', 'dropdown', '/articles(/create)?');
		Menus.addSubMenuItem('topbar', 'articles', 'List Articles', 'articles');
		Menus.addSubMenuItem('topbar', 'articles', 'New Article', 'articles/create');
		Menus.addMenuItem('locale', 'Language', 'articles', 'dropdown', '/articles(/create)?');
		Menus.addSubMenuItem('locale', 'articles', 'English', 'en');
		Menus.addSubMenuItem('locale', 'articles', 'Hebrew', 'he');
	}
]);