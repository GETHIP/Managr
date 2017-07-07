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
		if(Roles.userIsInRole(this.userId, "student")){
		var allEvents = [];
		var groupIdList = [];
		var data = Events.find().fetch();
		var groupData = Groups.find().fetch();
		var id = Student.findOne({userId: this.userId})._id;

		for (var i = 0; i < groupData.length; i++) {
			if(groupData[i].studentIds.indexOf(id) != -1){
				groupIdList.push(groupData[i]._id);
			}
		}

	for(var x = 0; x < groupIdList.length; x++){
		for (var i = 0; i < data.length; i++) {
			if(data[i].studentInvites.indexOf(id) != -1 || data[i].groupInvites.indexOf(groupIdList[x]) != -1){
				allEvents.push(data[i]);
			}
		}
	}
		var returnIds = [];
		for (var i = 0; i < allEvents.length; i++) {
			returnIds.push(allEvents[i]._id);
		}
		return Events.find({_id: { $in: returnIds }});
	}else{
		return Events.find();
	}
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
