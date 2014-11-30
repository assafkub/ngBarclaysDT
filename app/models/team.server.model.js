'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Team Schema
 */
var TeamSchema = new Schema({
	name:String,
	rank:Number,
	apiId:Number,
	apiName: String,
	logoURL:String,
	shortName: String,
	points:Number,
	goals:Number,
	goalsAgainst:Number,
	goalDifference:Number,
	numOfPlayers: Number,
	players: [{firstName:String,
	      	lastName:String,
	    	value:Number,
	    	position:String,
	    	squadNumber: Number,
	    	nationality:String,
	    	appearances: Number,
	    	substitutions: Number,
	    	goals: Number,
	    	penalties: Number,
	    	yCards: Number,
	    	rCards: Number}]
	
});

mongoose.model('Team', TeamSchema);