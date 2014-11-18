'use strict';

// Setting up route
angular.module('team').config(['$stateProvider',
	function($stateProvider) {
		// Articles state routing
		$stateProvider.
		state('myteams', {
			url: '/myteams',
			templateUrl: 'modules/teams/views/my-teams.client.view.html'
		}).
		state('createArticle1', {
			url: '/articles/create',
			templateUrl: 'modules/teams/views/create-teams.client.view.html'
		});
	}
]);