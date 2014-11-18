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
	logoURL:String,
	shortName: String,
	points:Number,
	goals:Number,
	goalsAgainst:Number,
	goalDifference:Number
	
});

mongoose.model('Team', TeamSchema);