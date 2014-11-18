'use strict';

angular.module('core').controller('AdminCtrl',
		['$scope', 'Authentication',
		 'Menus', '$translate','Team','$location','$http',
		 function($scope, Authentication, Menus, $translate, Team, $location, $http) {
			$scope.authentication = Authentication;
			$scope.isCollapsed = false;
			$scope.menu = Menus.getMenu('admin');
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
				$scope.teams = Team.query(function(){
					$http.get('/getTeamsRank').
					success(function(data, status, headers, config) {
						$scope.teamsRank = data.ranking[0];
						angular.forEach(data.ranking[0], function(value, key) {
							for(var i = 0; i < $scope.teams.length; i++)
								if($scope.teams[i].name === value.team){
									$scope.teams[i].rank = value.rank;
									$scope.teams[i].goalDifference =  value.goalDifference;
									$scope.teams[i].goals =  value.goals;
									$scope.teams[i].goalsAgainst =  value.goalsAgainst;
									$scope.teams[i].points =  value.points;


									console.log($scope.teams[i]);
									$scope.teams[i].$update(function(response) {
									}, function(errorResponse) {
										console.log(errorResponse.data.message);
									});
								}

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