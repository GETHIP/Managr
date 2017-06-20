import { Student } from '../../collections/student.js';
import { Events } from '../../collections/event.js';

Template.editEvent.onCreated(function() {
		Meteor.subscribe("Student");
    Meteor.subscribe("Events");
});

Template.editEvent.events({
  'click #submitEditEventButton': function(event, template) {
		event.preventDefault();
		// var authorName = Instructor.findOne({userId: Meteor.user()._id}).name;
		// if (document.getElementById('editor') != undefined) {
		// 	if(document.getElementById('createPostTitle').value == "" && document.getElementById('editor').innerHTML == ""){
		// 		Modal.show("missingFields", "Please enter a title and body text before posting.");
		// 	} else if(document.getElementById('createPostTitle').value == ""){
		// 		Modal.show("missingFields", "Please enter a title before posting.");
		// 	} else if(document.getElementById('editor').innerHTML == ""){
		// 		Modal.show("missingFields", "Please enter body text before posting.");
		// 	} else {
		// 		Meteor.call("updatePost", FlowRouter.getParam("blog_id"), document.getElementById('editor').innerHTML, document.getElementById('createPostTitle').value, isPublic);
		// 		FlowRouter.go("/blogs/"+FlowRouter.getParam("blog_id"));
		// 	}
		// } else {
		// 	if(document.getElementById('createPostTitle').value == "" && document.getElementById('scriptEditor').value == ""){
		// 		Modal.show("missingFields", "Please enter a title and body text before posting.");
		// 	} else if(document.getElementById('createPostTitle').value == ""){
		// 		Modal.show("missingFields", "Please enter a title before posting.");
		// 	} else if(document.getElementById('scriptEditor').value == ""){
		// 		Modal.show("missingFields", "Please enter body text before posting.");
		// 	} else {
		// 		Meteor.call("updatePost", FlowRouter.getParam("blog_id"), document.getElementById('scriptEditor').value, document.getElementById('createPostTitle').value, isPublic);
		// 		FlowRouter.go("/blogs/"+FlowRouter.getParam("blog_id"));
		// 	}
		}
	});

Template.eventsPage.events({
  'click #editEventButton': function(event, template) {
    event.preventDefault();
    FlowRouter.go('/events');
  }
});

Template.editEvent.helpers({
	eventName: function() {
		return getThisEvent().name;
	}
});

Template.editEvent.helpers({
	eventDescription: function() {
		return getThisEvent().description;
	}
});

Template.editEvent.helpers({
	eventDate: function() {
		console.log(getThisEvent.date);
		return getThisEvent().date;
	}
});

Template.editEvent.helpers({
	eventLocation: function() {
		return getThisEvent().location;
	}
});

var getThisEvent = function() {
	var id = FlowRouter.getParam("id");
	return Events.findOne({ _id: id });
}
