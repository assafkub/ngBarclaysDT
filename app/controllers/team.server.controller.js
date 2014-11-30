'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
errorHandler = require('./errors.server.controller'),
Team = mongoose.model('Team'),
_ = require('lodash');
/**
 * Create a Team
 */
var create = function(req, res) {
	var team = new Team(req.body);
	team.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(team);
		}
	});

};

/**
 * Show the current team
 */
var read = function(req, res) {
	res.json(req.team);
};

/**
 * Update a article
 */
var update  = function(req, res) {
	var team = req.team;

	team = _.extend(team, req.body);

	team.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(team);
		}
	});
};
/**
 * one team players
 */
var oneTeam = function(req, res) {
	Team.findById(req.params.teamId,function(err, teams) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else if(teams.numOfPlayers && teams.players.length){
			res.json(teams);
		}
		else
		{
			var teamsCtrl = require('../../app/controllers/team.server.controller');
			teamsCtrl.getTeamPlayers(null, res, teams);
		}
	});
};
/**
 * List of Teams
 */
var list = function(req, res) {
	Team.find().sort('name').exec(function(err, teams) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(teams);
		}
	});
};
/**
 * Article middleware
 */
var teamByID = function(req, res, next, id) {
	Team.findById(id).exec(function(err, team) {
		if (err) return next(err);
		if (!team) return next(new Error('Failed to load team ' + id));
		req.team = team;
		next();
	});
};

/**
 * Article authorization middleware
 */


var getTeamPlayers = function (req, res, teams) {
	{
		var fs = require('fs');
		var url;
		var YQL = require('yql');
		if(teams)
			url = 'http://www.11v11.com/teams/'+ teams.apiName + '/tab/players';
		else
			url = 'http://www.11v11.com/teams/west-bromwich-albion/tab/players';
		var query = new
		YQL('select * from html where url="'+url+'" and xpath="//table/*"');
		query.exec(function (error, response) {
			var playersArr = [];
			if(error){
				console.log(error);
				return;
			}

			for(var i = 0; i < response.query.results.tbody.tr.length; i++)
			{
				var val = response.query.results.tbody.tr[i];
				var obj = {};
				obj.firstName = val.td[1].a.content ? val.td[1].a.content : val.td[1].a.strong.split(' ')[0];
				obj.lastName = val.td[1].a.content ? val.td[1].a.strong : (val.td[1].a.strong.split(' ')[1] ? val.td[1].a.strong.split(' ')[1] : '');
				obj.position = val.td[3].p;
				obj.nationality = val.td[2].img ? val.td[2].img.title: '';
				obj.squadNumber = val.td[0] ? val.td[0].p : null;
				obj.appearances = val.td[4] ? val.td[4].p : 0;
				obj.substitutions = val.td[5] ? val.td[5].p : 0;
				obj.goals = val.td[6] ? val.td[6].p : 0;
				obj.penalties = val.td[7] ? val.td[7].p : 0; 
				obj.yCards = val.td[8] ? (val.td[8].span ? val.td[8].span : 0) : 0;
				obj.rCards  = val.td[9] ?  (val.td[9].span ? val.td[9].span : 0) : 0;
				playersArr.push(obj);

			}

			Team.findOneAndUpdate({ name: teams.name}, {players:playersArr, numOfPlayers:playersArr.length}, function(err, team) {
				if (err) {
					console.log('got an error');
				}
				else{
					console.log('Team: ' + team.name + ' Updated');
					res.json(team);
				}
			});
		});



	};
	}

	var hasAuthorization = function(req, res, next) {
		if (!req.team) {
			return res.status(403).send({
				message: 'User is not authorized'
			});
		}
		next();
	};
	

	module.exports = {
			getTeamPlayers: getTeamPlayers,
			hasAuthorization: hasAuthorization,
			teamByID : teamByID,
			list : list,
			oneTeam : oneTeam,
			create: create,
			update: update,
			read: update
	}