'use strict';

/**
 * Module dependencies.
 */

var player = require('../../app/controllers/player.server.controller');

module.exports = function(app) {
	// Article Routes
	app.route('/player')
		.get(player.list)
		.post(player.create);
	app.route('/player/getTeamPlayers').get(player.getTeamPlayers);
	app.route('/player/updateTable')
		.get(player.list);
	app.route('/player/:playerId')
	.put(player.update);

	// Finish by binding the article middleware
	app.param('playerId', player.playerById);
};