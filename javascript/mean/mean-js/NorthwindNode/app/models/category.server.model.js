'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Validation
 */
function validateLength(v) {
	// a custom validation function for checking string length to be used by the model
	return v.length <= 15;
}

/**
 * Category Schema
 */
var CategorySchema = new Schema({
	// the property name
	created: {
		// types are defined e.g. String, Date, Number (http://mongoosejs.com/docs/guide.html)
		type: Date,
		// default values can be set
		default: Date.now
	},
	description: {
		type: String,
		default: '',
		// types have specific functions e.g. trim, lowercase, uppercase
		trim: true
	},
	name: {
		type: String,
		default: '',
		trim: true,
		unique: true,
		// make this a required fields
		required: 'name cannot be blank',
		// wires in a custom validator function
		validate: [validateLength, 'name must be 15 chars in length or less']
	}
});

// Expose the model to other objects
mongoose.model('Category', CategorySchema);
