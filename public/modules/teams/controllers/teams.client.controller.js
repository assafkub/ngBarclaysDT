'use strict';

angular.module('team').controller('TeamsController', ['$scope', '$stateParams', '$location',
                                                      'Authentication', 'Team','$http',
                                                      function($scope, $stateParams, $location, Authentication, Team, $http, $filter) {
	$scope.authentication = Authentication;

	$scope.create = function() {
		var article = new Team({
			title: this.title,
			content: this.content
		});
		article.$save(function(response) {
			$location.path('articles/' + response._id);

			$scope.title = '';
			$scope.content = '';
		}, function(errorResponse) {
			$scope.error = errorResponse.data.message;
		});
	};

	$scope.remove = function(article) {
		if (article) {
			article.$remove();

			for (var i in $scope.articles) {
				if ($scope.articles[i] === article) {
					$scope.articles.splice(i, 1);
				}
			}
		} else {
			$scope.article.$remove(function() {
				$location.path('articles');
			});
		}
	};

	$scope.update = function() {
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
		var teams = $scope.teams;

//		teams.$update(function() {
//		$location.path('teams/updateTable');
//		}, function(errorResponse) {
//		$scope.error = errorResponse.data.message;
//		});
	};

	$scope.find = function() {
		$scope.teams = Team.query();
	};

	$scope.findOne = function() {
		$scope.team = Team.get({
			articleId: $stateParams.articleId
		});
	};
}
]);