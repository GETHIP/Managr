import { Meteor } from 'meteor/meteor';
import { Posts } from '../collections/blogPosts.js';
import { Comments } from '../collections/comments.js';
import { Assignments } from '../collections/assignments.js';
import { Instructor } from '../collections/instructor.js';
import { Student } from '../collections/student.js';
import { Groups } from '../collections/groups.js';
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

	Meteor.publish("Coaches", function() {
		return Instructor.find({ name: { $ne: "Admin" } });
	});

	Meteor.publish("Groups", function() {
		return Groups.find();
	});

	Meteor.publish("singleGroup", function(id) {
		check(id, String);
		return Groups.find({_id: id});
	});

	Meteor.publish("CurrentAdded", function(id) {
		// check(id, String);
		// var thisGroup = Groups.find({_id: id});
		// return thisGroup.;
	});

	Meteor.publish("CurrentNotAdded", function(id) {
		// check(id, String);
		// console.log(id);
		// var thisGroup = Groups.find({_id: id});
		// var studentsIn = thisGroup.studentIds;
		// var studentsOut = Student.find({ isArchived: false });
		// var index;
		// for(var i = 0; i < studentsIn.length; i++) {
		// 		for(var ii = 0; ii < studentsOut.length; ii++) {
		// 				if(studentsOut[ii]._id === studentsIn[i]) {
		// 						studentsOut.splice(ii, 1);
		// 						ii = -1;
		// 				}
		// 		}
		// }
		// return studentsOut;
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
