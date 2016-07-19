import { Assignments } from '../../collections/assignments.js';
import { Student } from '../../collections/student.js';

Template.adminSingleAssignment.onCreated(function() {
		Meteor.subscribe("Assignments");
		Meteor.subscribe("Student");
});

Template.adminSingleAssignment.events({
		"click #modifyAssignment"(event) {
				event.preventDefault();
				var assignmentId = FlowRouter.getParam("id");
				FlowRouter.go("/assignments/edit/single/admin/" + assignmentId);
		},
		"click #deleteAssignment"(event) {
				event.preventDefault();
		 		var assignmentId = FlowRouter.getParam("id");
				Meteor.call('removeAssignment', assignmentId);
				FlowRouter.go("/assignments");
		}
});
