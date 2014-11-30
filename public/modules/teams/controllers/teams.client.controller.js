'use strict';

angular.module('team').controller('TeamsController', ['$scope', '$stateParams', '$location',
                                                      'Authentication', 'Team','$http',
                                                      function($scope, $stateParams, $location, Authentication, Team, $http) {
	$scope.authentication = Authentication;
	$scope.droppedObjects1 = [];
	$scope.droppedFc = [];
	$scope.droppedMc = [];
	$scope.droppedDc = [];
	$scope.droppedGk = [];
	$scope.playersPosition = ['All', 'Goalkeeper', 'Defender', 'Centre back', 'Midfielder', 'Forward'];
	$scope.dropdownMenuBtnName = "Select Team";
	$scope.selectedClass = 'All';
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
			teamId: $stateParams.teamId
		});
	};
	$scope.getTeamById = function(id){

		$stateParams.teamId = id;
		$scope.team = Team.get({
			teamId: $stateParams.teamId
		});
		$scope.team.$promise.then(function(data) {
			$scope.dropdownMenuBtnName = $scope.team.name;
		});

	}
	$scope.onDropComplete = function(data,evt){
		var pos = data.position.split('/');
		switch (pos[0]) {
		case $scope.playersPosition[1]:
			console.log("Player Pos is GK " + data.position);
			var index = $scope.droppedGk.indexOf(data);
			if (index == -1 && $scope.droppedGk.length < 1)
				$scope.droppedGk.push(data);
		break;
		case $scope.playersPosition[2]:
		case $scope.playersPosition[3]:
			console.log("Player Pos is DC/CB " + data.position);
			var index = $scope.droppedDc.indexOf(data);
			if (index == -1)
				$scope.droppedDc.push(data);
		break;
		case $scope.playersPosition[4]:
			console.log("Player Pos is MC " + data.position);
			var index = $scope.droppedMc.indexOf(data);
			if (index == -1)
				$scope.droppedMc.push(data);
		break;
		case $scope.playersPosition[5]:
			console.log("Player Pos is FC " + data.position);
			var index = $scope.droppedFc.indexOf(data);
			if (index == -1)
				$scope.droppedFc.push(data);
		break;

		default:
			break;
		}

	}
	$scope.onDragSuccess1=function(data,evt){
		console.log("133","$scope","onDragSuccess1", "", evt);
		var index = $scope.droppedObjects1.indexOf(data);
		if (index > -1) {
			$scope.droppedObjects1.splice(index, 1);
		}
	};

	$scope.onPositionClicked = function(pos){
		for(var i = 0; i < $scope.playersPosition.length; i++)
			$('#pos_' + $scope.playersPosition[i].replace(' ', '')).removeClass('active');
		$('#pos_' + pos.replace(' ', '')).addClass('active');
		$scope.selectedClass = pos;
	};

	$scope.isGK = function(obj){
		console.log("On isGK() " + obj);
		return obj.position == $scope.playersPosition[1];
	};
	$scope.isDC = function(obj){
		console.log("On isDC() " + obj);
		return obj.position == $scope.playersPosition[1] && obj.position == $scope.playersPosition[2];
	};
	$scope.isMC = function(obj){
		console.log("On isMC() " + obj);
		return obj.position == $scope.playersPosition[3];
	};
	$scope.isFC = function(obj){
		console.log("On isFC() " + obj);
		return obj.position == $scope.playersPosition[4];
	};
}
]);