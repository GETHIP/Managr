import { Student } from '../../collections/student.js';
import { Events } from '../../collections/event.js';

Template.editEvent.onCreated(function() {
		Meteor.subscribe("Student");
    Meteor.subscribe("Events");
});

Template.editEvent.events({
  'click #submitEditEventButton': function(event, template) {
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
		console.log(getThisEvent().date);
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
