import { Assignments } from '../../collections/assignments.js';
import { Student } from '../../collections/student.js';

Template.adminSingleAssignment.onCreated(function() {
		Meteor.subscribe("Assignments", function() {
				var assignment = Assignments.findOne({_id: FlowRouter.getParam("id")});
				if(assignment == undefined) {
						FlowRouter.go("/assignments");
				}
		});
		Meteor.subscribe("Student");
});

Template.adminSingleAssignment.events({
		"click #modifyAssignment"(event) {
				event.preventDefault();
				var assignmentId = FlowRouter.getParam("id");
				FlowRouter.go("/assignments/edit/single/admin/" + assignmentId);
		},

		'click #deleteAssignment': function(event){
			Modal.show('deleteAssignmentModal');
		}

});
