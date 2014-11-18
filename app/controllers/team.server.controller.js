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
exports.create = function(req, res) {
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
exports.read = function(req, res) {
	res.json(req.team);
};

/**
 * Update a article
 */
exports.update = function(req, res) {
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
 * Delete an article
 */
exports.delete = function(req, res) {
	var team = req.team;

	team.remove(function(err) {
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
 * List of Teams
 */
exports.list = function(req, res) {
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
exports.teamByID = function(req, res, next, id) {
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
exports.hasAuthorization = function(req, res, next) {
	if (!req.team) {
		return res.status(403).send({
			message: 'User is not authorized'
		});
	}
	next();
};