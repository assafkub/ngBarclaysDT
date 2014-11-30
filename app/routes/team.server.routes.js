'use strict';

/**
 * Module dependencies.
 */

var teams = require('../../app/controllers/team.server.controller');

module.exports = function(app) {
	// Article Routes
	app.route('/teams')
		.get(teams.list)
		.post(teams.create);
	app.route('/teams/getTeamPlayers').get(teams.getTeamPlayers);
	app.route('/team/updateTable')
		.get(teams.list);
	app.route('/teams/:teamId')
	.get(teams.oneTeam)
	.put(teams.update);

	// Finish by binding the article middleware
	app.param('teamId', teams.teamByID);
};