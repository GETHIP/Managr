import { Meteor } from 'meteor/meteor';
import { Posts } from '../collections/blogPosts.js';
import { Comments } from '../collections/comments.js';
import { Assignments } from '../collections/assignments.js';
import { Instructor } from '../collections/instructor.js';
import { Student } from '../collections/student.js';
import { Drafts } from '../collections/drafts.js';
import { userIsStudent, userIsInstructor, userIdIsValid } from '../lib/permissions.js';
import { isStudent, isInstructor, userIsValid, currentUserOrInstructor, nameOfUser } from '../lib/permissions.js';

export function allowAll() {

	Posts.allow({
		'insert': function(userId, doc) {
			if (Meteor.user()._id == null) {
				return false;
			}
			return Meteor.user()._id == userId && isInstructor();
		},
		'update': function(userId, doc){
			true;
		},
		'remove': function(userId, doc){
			true;
		}
	});

	Drafts.allow({
		'insert': function(userId, doc) {
			true;
		},
		'update': function(userId, doc){
			true;
		},
		'remove': function(userId, doc){
			true;
		}
	});

	//control update better
	Student.allow({
		update: function(userId, doc) {
			return true;
		}
	});

}