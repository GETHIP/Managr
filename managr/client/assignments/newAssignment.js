import { Instructor } from '../../collections/instructor.js';
import { Student } from '../../collections/student.js';
import { Assignments } from '../../collections/assignments.js';

Template.newAssignment.onCreated(function() {
  Meteor.subscribe('Assignments');
  Meteor.subscribe('Instructor');
  Meteor.subscribe('Student');
});

Template.newAssignment.helpers({
  assignments: function() {
    var formattedAssignments = [];
    var assignments = Assignments.find({}).fetch();

    for (var i = 0; i < objects.length; i++) {
        var assignment, formattedAssignment;
        assignment = assignments[i];
        // The formatted object to be returned
        formattedAssignment = {
          title: assignment.title,
          description: assignment.description,
          dueDate: (assignment.dueDate.getMonth() + 1) + "/" + assignment.dueDate.getDate() + "/" +  assignment.dueDate.getFullYear(),
          assigner: assignment.assigner,
          dateAssigned: (assignment.dueDate.getMonth() + 1) + "/" + assignment.dueDate.getDate() + "/" +  assignment.dueDate.getFullYear(),
          pointsPossible: assignment.pointsPossible
        }
        formattedAssignments.push(formattedAssignment);
    }
    return formattedAssignments;
  }
});


Template.newAssignment.events({
  'submit .submitbtn'(event){
    event.preventDefault();
    const form = event.target;

    var title = form.name.value;
    var description = document.getElementById("editor").innerHTML;
    var dueDate = form.dateDue.value;
    var pointsPossible = form.points.value;

    Meteor.call("createAssignment", title, description, dueDate, pointsPossible);

    FlowRouter.go("/assignments");
  }
});
