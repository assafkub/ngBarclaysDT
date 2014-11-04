'use strict';

angular.module('core').controller('HeaderSubController', ['$scope', 'Authentication', 'Menus', '$translate',
	function($scope, Authentication, Menus, $translate, HeaderController) {
		$scope.authentication = Authentication;
		$scope.isCollapsed = false;
		$scope.menu = Menus.getMenu('locale');
		$scope.menus = Menus;

		$scope.toggleCollapsibleMenu = function() {
			$scope.isCollapsed = !$scope.isCollapsed;
		};
		$scope.changeLanguage = function(locale) {
			$translate.use(locale);
			$scope.menu.items[0].title = $translate.instant("chooseLang");
			$scope.menu.items[0].items[0].title = $translate.instant("enLanguage");
			$scope.menu.items[0].items[1].title = $translate.instant("heLanguage");
		};
		
		// Collapsing the menu after navigation
		$scope.$on('$stateChangeSuccess', function() {
			$scope.isCollapsed = false;
		});
	}
]);