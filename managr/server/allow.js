import { Meteor } from 'meteor/meteor';
import { Posts } from '../collections/blogPosts.js';
// import { Comments } from '../collections/comments.js';
import { Assignments } from '../collections/assignments.js';
import { Surveys } from '../collections/surveys.js';
import { Instructor } from '../collections/instructor.js';
import { Student } from '../collections/student.js';
import { Groups } from '../collections/groups.js';
import { Drafts } from '../collections/drafts.js';
import { userIsStudent, userIsInstructor, userIdIsValid } from '../lib/permissions.js';
import { isStudent, isInstructor, userIsValid, currentUserOrInstructor, nameOfUser } from '../lib/permissions.js';
import { Globals } from '../collections/globals.js';

export function allowAll() {

	/*
	 *	We don't allow ANY manipulation of the database on the client.
	 *	ALL inserts / updates / removes must happen via Meteor.methods,
	 *	which all have permissions checks.
	 */
	Assignments.allow({
		'insert': function(userId, doc) {
			return false;
		},
		'update': function(userId, doc) {
			return false;
		},
		'remove': function(userId, doc) {
			return false;
		}
	});

	Drafts.allow({
		'insert': function(userId, doc) {
			return false;
		},
		'update': function(userId, doc) {
			return false;
		},
		'remove': function(userId, doc) {
			return false;
		}
	});

	Student.allow({
		'insert': function(userId, doc) {
			return false;
		},
		'update': function(userId, doc) {
			return false;
		},
		'remove': function(userId, doc) {
			return false;
		}
	});

	Surveys.allow({
		'insert': function(userId, doc) {
			return false;
		},
		'update': function(userId, doc) {
			return false;
		},
		'remove': function(userId, doc) {
			return false;
		}
	});


	Groups.allow({
		'insert': function(userId, doc) {
			return false;
		},
		'update': function(userId, doc) {
			return false;
		},
		'remove': function(userId, doc) {
			return false;
		}
	});

	Instructor.allow({
		'insert': function(userId, doc) {
			return false;
		},
		'update': function(userId, doc) {
			return false;
		},
		'remove': function(userId, doc) {
			return false;
		}
	});

	Posts.allow({
		'insert': function(userId, doc) {
			return false;
		},
		'update': function(userId, doc) {
			return false;
		},
		'remove': function(userId, doc) {
			return false;
		}
	});

	Globals.allow({
		'insert': function(userId, doc) {
			return false;
		},
		'update': function(userId, doc) {
			return false;
		},
		'remove': function(userId, doc) {
			return false;
		}
	});

}
