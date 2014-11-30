'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
errorHandler = require('./errors.server.controller'),
Player = mongoose.model('Player'),
_ = require('lodash');

exports.index = function(req, res) {
	res.render('index', {
		user: req.user || null,
		request: req
	});
};

exports.getAllTeams = function(req, res){
	var fs = require('fs');
	var callback = function (err,data) {
		if (err) {
			res.send(err);
		}
		res.send(data);
	};
	fs.readFile('config/resources/teams.json', 'utf8', callback);

};
exports.getTeamsRanking = function(req, res){
	var fs = require('fs');
	var callback = function (err,data) {
		if (err) {
			res.send(err);
		}
		res.send(data);
	};
	fs.readFile('config/resources/teamsRank.json', 'utf8', callback);

};

