import { Meteor } from 'meteor/meteor';
import { Posts } from '../collections/blogPosts.js';
import { Comments } from '../collections/comments.js';
import { Assignments } from '../collections/assignments.js';
import { Instructor } from '../collections/instructor.js';
import { Student } from '../collections/student.js';
import { Groups } from '../collections/groups.js';
import { Events } from '../collections/event.js';
import { Drafts } from '../collections/drafts.js';
import { Globals } from '../collections/globals.js';

export function publishAll() {

	Meteor.publish("Assignments", function() {
        return Assignments.find();
    });

	Meteor.publish("Comments", function(){
		return Comments.find();
	});

	Meteor.publish("Drafts", function(){
		return Drafts.find();
	});

	Meteor.publish("Instructor", function() {
		return Instructor.find();
	});

	Meteor.publish("Posts", function(){
		var isValid = true;
		if(!this.userId){
			isValid = false;
		}
		else if(Roles.userIsInRole(this.userId, 'unconfirmed')){
			isValid = false;
		}
		if(isValid){
			return Posts.find();
		}
		else{
			return Posts.find({isPublic: true});
		}
	});

	Meteor.publish("Student", function() {
		return Student.find({ isArchived: false });
	});

	Meteor.publish("Groups", function() {
		return Groups.find();
	});

	Meteor.publish("Events", function() {
		return Events.find();
	});

	Meteor.publish("userData", function() {
		return Meteor.users.find({});
	});

	Meteor.publish("dummyUsers", function() {
		//We don't want to actually return any data,
		//we just want to force the accessDenied template
		//to wait for the users to load from the server.
		return Meteor.users.find({_id: ""});
	});

	Meteor.publish("Globals", function() {
		return Globals.find({});
	});
}
