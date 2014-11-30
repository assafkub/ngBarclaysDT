'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Player = mongoose.model('Player'),
	_ = require('lodash');

/**
 * Create a Player
 */
exports.create = function(req, res) {
	var player = new Player(req.body);
	player.save(function(err) {
			if (err) {
				return res.status(400).send({
					message: errorHandler.getErrorMessage(err)
				});
			} else {
				res.json(player);
			}
		});

};

/**
 * Show the current player
 */
exports.read = function(req, res) {
	res.json(req.player);
};

/**
 * Update a article
 */
exports.update = function(req, res) {
	var player = req.player;

	player = _.extend(player, req.body);

	player.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(player);
		}
	});
};

/**
 * Delete an article
 */
exports.delete = function(req, res) {
	var player = req.player;

	player.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(player);
		}
	});
};

/**
 * List of Teams
 */
exports.list = function(req, res) {
	Player.find().sort('name').exec(function(err, teams) {
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
exports.playerById = function(req, res, next, id) {
	Player.findById(id).exec(function(err, player) {
		if (err) return next(err);
		if (!player) return next(new Error('Failed to load player ' + id));
		req.player = player;
		next();
	});
};
exports.getTeamPlayers = function(req, res){
//	//YQL = require('yql');
////	var query = new
////	YQL('select * from html where url="http://www.11v11.com/teams/chelsea/tab/players" and xpath="//table/*"');
////	query.exec(function (error, response) {
////	res.json(response);
////	});
//	var fs = require('fs');
//	
//	var callback = function (err,data) {
//		if (err) {
//			res.send(err);
//		}
//		var players = JSON.parse(data);
//		
//		players.query.results.tbody.tr.forEach(function(val){
//			var Team = mongoose.model('Team');
//			Team.findOne({ name: 'Chelsea FC'}, function (err, person) {
//				  if (err) return handleError(err);
//				  console.log('%s %s is a %s.', person);
//				});
//			var obj = {};
//			obj.firstName = val.td[1].a.content ? val.td[1].a.content : val.td[1].a.strong.split(' ')[0];
//			obj.lastName = val.td[1].a.content ? val.td[1].a.strong : (val.td[1].a.strong.split(' ')[1] ? val.td[1].a.strong.split(' ')[1] : "");
//			obj.position = val.td[3].p;
//			obj.nationality = val.td[2].img.title;
//			obj.squadNumber = val.td[0] ? val.td[0].p : null;
//			obj.appearances = val.td[4] ? val.td[4].p : 0;
//			obj.substitutions = val.td[5] ? val.td[5].p : 0;
//			obj.goals = val.td[6] != null ? val.td[6].p : 0;
//			obj.penalties = val.td[7] != null ? val.td[7].p : 0; 
//			obj.yCards = val.td[8] != null ? (val.td[8].span ? val.td[8].span : 0) : 0;
//			obj.rCards  = val.td[9] != null ?  (val.td[9].span ? val.td[9].span : 0) : 0;
//			var player = new Player(obj);
//			console.log(player);
//		});
//		res.send(data);
//	};
//	fs.readFile('config/resources/cPlayers.json', 'utf8', callback);

};
/**
 * Article authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (!req.player) {
		return res.status(403).send({
			message: 'User is not authorized'
		});
	}
	next();
};
