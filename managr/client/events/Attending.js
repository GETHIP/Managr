import { Student } from '../../collections/student.js';
import { Instructor } from '../../collections/instructor.js';
import { Events } from '../../collections/event.js';
import { Groups } from '../../collections/groups.js';

Template.attending.onCreated(function() {
    Meteor.subscribe("Student");
    Meteor.subscribe("Events");
    Meteor.subscribe("Instructor");
    Meteor.subscribe("Groups");
});

Template.eventView.helpers({
	studentName: function() {
		return getThisEvent().name;
	}
});

Template.attending.helpers({
	rsvp: function() {
		return getThisEvent().rsvp;
	}
});
