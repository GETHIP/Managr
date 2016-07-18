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

    var formattedAssignment;
      formattedAssignment = {
        title: assignment.title,
        description: assignment.description,
        dueDate: (assignment.dueDate.getFullYear()) + "-" + numPad(assignment.dueDate.getMonth() + 1) + "-" +  numPad(assignment.dueDate.getDate() + 1),
        assigner: assignment.assigner,
        dateAssigned: (assignment.dueDate.getFullYear() + 1) + "-" + numPad(assignment.dueDate.getMonth()) + "-" +  numPad(assignment.dueDate.getDate()),
        pointsPossible: assignment.pointsPossible
      }
      return formattedAssignment;
  	}
});

Template.editSingleAssignment.events({
  'submit .submitbtn'(event) {
    event.preventDefault();
    const form = event.target;

    var assignment = Assignments.findOne({_id: FlowRouter.getParam("id")});

    Assignments.update({
      _id:assignment._id
    },
    {
      $set: {
        title: form.name.value,
        description: document.getElementById("editor").innerHTML,
        dueDate: form.dateDue.value,
        assigner: Instructor.findOne({userId: Meteor.user()._id}).name,
        dateAssigned: new Date(),
        pointsPossible: form.points.value
      }
    });
    FlowRouter.go("/assignments");
  }
});
