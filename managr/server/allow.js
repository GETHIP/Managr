import { Meteor } from 'meteor/meteor';
import { Posts } from '../collections/blogPosts.js';
import { Comments } from '../collections/comments.js';
import { Assignments } from '../collections/assignments.js';
import { Instructor } from '../collections/instructor.js';
import { Student } from '../collections/student.js';
import { Drafts } from '../collections/drafts.js';

export function allowAll() {

	Posts.allow({
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