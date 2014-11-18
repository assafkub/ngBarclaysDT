'use strict';

angular.module('core').controller('HeaderSubController',
		['$scope', 'Authentication',
		 'Menus', '$translate','Team','$location','$http',
		 function($scope, Authentication, Menus, $translate, Team, $location, $http) {
			$scope.authentication = Authentication;
			$scope.isCollapsed = false;
			$scope.menu = Menus.getMenu('locale');
			$scope.menus = Menus;

			$scope.toggleCollapsibleMenu = function() {
				$scope.isCollapsed = !$scope.isCollapsed;
			};
			$scope.changeLanguage = function(locale) {
				$translate.use(locale);
				$scope.menu.items[0].title = $translate.instant('chooseLang');
				$scope.menu.items[0].items[0].title = $translate.instant('enLanguage');
				$scope.menu.items[0].items[1].title = $translate.instant('heLanguage');
			};

			$scope.updateDB = function(){
				$http.get('/getAllTeams').
				success(function(data, status, headers, config) {
					angular.forEach(data, function(value, key) {
						var team = new Team({
							name: value.name,
							rank:0,
							apiId:value.id,
							logoURL:value.crestUrl,
							shortName:value.shortName,
							goalDifference: 0,
							goals : 0,
							goalsAgainst : 0, 
							points: 0

						});
						team.$save(function(response) {
							$location.path('saveTeams/' + response._id);
						}, function(errorResponse) {
							console.log(errorResponse.data.message);
						});
					});


				});

			};
			// Collapsing the menu after navigation
			$scope.$on('$stateChangeSuccess', function() {
				$scope.isCollapsed = false;
			});
		}
		]);