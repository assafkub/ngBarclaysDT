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
	LastName:String,
	value:Number,
	team: {
		type: Schema.ObjectId,
		ref: 'Team'
	},
	position:String
	
});

mongoose.model('Player', PlayerSchema);