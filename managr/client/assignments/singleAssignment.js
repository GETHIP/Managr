import { Assignments } from '../../collections/assignments.js';
import { Student } from '../../collections/student.js';

Template.singleAssignment.onCreated(function() {
  Meteor.subscribe('Assignments', function() {
      var assignment = Assignments.findOne({_id: FlowRouter.getParam("id")});
      if(assignment == undefined) {
          FlowRouter.go("/assignments");
      }
  });
    Meteor.subscribe('Student');
});

Template.singleAssignment.helpers({
    assignments: function() {
      var assignment = Assignments.findOne({_id: FlowRouter.getParam("id")});

			if (assignment != undefined) {
        var formattedAssignment;
        formattedAssignment = {
            title: assignment.title,
            description: assignment.description,
            dueDate: (assignment.dueDate.getMonth() + 1) + "/" + (assignment.dueDate.getDate() + 1) + "/" +  assignment.dueDate.getFullYear(),
            assigner: assignment.assigner,
            dateAssigned: (assignment.dateAssigned.getMonth() + 1) + "/" + assignment.dateAssigned.getDate() + "/" +  assignment.dateAssigned.getFullYear(),
            pointsPossible: assignment.pointsPossible
        }
        return formattedAssignment;
			}
    }
});

Template.singleAssignment.events({
    'click #submitAssignment'(event) {
        event.preventDefault();

        var assignmentId = FlowRouter.getParam("id");
        Meteor.call("submitAssignment", assignmentId);

        FlowRouter.go("/assignments");
    }
});
