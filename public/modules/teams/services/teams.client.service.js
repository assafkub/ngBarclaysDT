'use strict';

//Articles service used for communicating with the articles REST endpoints
angular.module('team').factory('Team', ['$resource',
	function($resource) {
		return $resource('teams/:teamId', {
			teamId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);