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
            dueDate: assignment.dueDate.getMonth() + "/" + assignment.dueDate.getDate() + "/" +  assignment.dueDate.getFullYear(),
            assigner: assignment.assigner,
            dateAssigned: assignment.dateAssigned.getMonth() + "/" + assignment.dateAssigned.getDate() + "/" +  assignment.dateAssigned.getFullYear(),
            pointsPossible: assignment.pointsPossible
        }
        return formattedAssignment;
			}
    }
});

Template.singleAssignment.events({
    'click #submitAssignment': function(event){
      Modal.show('submitAssignmentModal');
    }
});

Template.submitAssignmentModal.events({
    'submit #confirmDeleteAssignment':function(event) {
        event.preventDefault();
        const form = event.target;

        $('#modal').modal('hide');

        var assignmentId = FlowRouter.getParam("id");
        var assignmentUrl = form.assignmentUrl.value;
        Meteor.call("submitAssignment", assignmentId, assignmentUrl);

        FlowRouter.go("/assignments");
    }
});
