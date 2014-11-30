'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Team Schema
 */
var PlayerSchema = new Schema({
	firstName:String,
	lastName:String,
	value:Number,
	team: {
		type: Schema.ObjectId,
		ref: 'Team'
	},
	position:String,
	squadNumber: Number,
	nationality:String,
	appearances: Number,
	substitutions: Number,
	goals: Number,
	penalties: Number,
	yCards: Number,
	rCards: Number
});

mongoose.model('Player', PlayerSchema);