import { Instructor } from '../../collections/instructor.js';
import { Assignments } from '../../collections/assignments.js';

Template.editSingleAssignment.onCreated(function() {
  Meteor.subscribe('Assignments');
  Meteor.subscribe('Instructor')
});

// Provides the editSingle template with information on a single assignment
Template.editSingleAssignment.helpers({
  assignments: function() {
    var assignment = Assignments.findOne({_id: FlowRouter.getParam("id")});

    function numPad(n) {
      if (n.toString().length == 1) {
        return "0" + n.toString();
      } else {
        return n.toString();
      }
    }

    var formattedAssignment = {
      title: assignment.title,
      description: assignment.description,
      dueDate: (assignment.dueDate.getFullYear()) + "-" + numPad(assignment.dueDate.getMonth() + 1) + "-" +  numPad(assignment.dueDate.getDate()),
      assigner: assignment.assigner,
      dateAssigned: assignment.dueDate.getFullYear() + "-" + numPad(assignment.dueDate.getMonth()) + "-" +  numPad(assignment.dueDate.getDate()),
      pointsPossible: assignment.pointsPossible
    }
    return formattedAssignment;
  }
});

Template.editSingleAssignment.events({
  'submit .submitbtn'(event) {
    event.preventDefault();
    const form = event.target;

    var assignmentId = FlowRouter.getParam("id");
    var title = form.name.value;
    var description = document.getElementById("editor").innerHTML;
    var dueDate = form.dateDue.value;
    var pointsPossible = form.points.value;

    Meteor.call("updateAssignment", assignmentId, title, description, dueDate, pointsPossible);

    FlowRouter.go("/assignments");
  }
});
