'use strict';

// Setting up route
angular.module('team').config(['$stateProvider',
	function($stateProvider) {
		// Articles state routing
		$stateProvider.
		state('pl-table', {
			url: '/pl-table',
			templateUrl: 'modules/teams/views/pl-table.view.html'
		}).
		state('teamPlayers', {
			url: '/teams/:teamId',
			templateUrl: 'modules/teams/views/team-players.client.view.html'
		}).
		state('substitutions', {
			url: '/substitutions',
			templateUrl: 'modules/teams/views/user.substitutions.view.html'
		});
	}
]);