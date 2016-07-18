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
    var formattedAssignments, assignments;
    formattedAssignments = [];
    assignments = Assignments.find({}).fetch();

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
  'click #createAssignment'(event) {
    window.location = "/assignments";
  },
  'submit .submitbtn'(event){
    event.preventDefault();
    const form = event.target;

    var assignmentId = Assignments.insert({
      title: form.name.value,
      description: document.getElementById("editor").innerHTML,
      dueDate: form.dateDue.value,
      assigner: Instructor.findOne({userId: Meteor.user()._id}).name,
      dateAssigned: new Date(),
      pointsPossible: form.points.value
    });

    //A default template for a grade that has no score but must get added to the students
    var emptyAssignment = {
       assignmentId: assignmentId,
       pointsReceived: -1,
       completed: false,
    };
  
    var allStudents = Student.find({}).fetch();
    if(allStudents.length > 0) {
      for(var i = 0; i < allStudents.length; i++) {
        var assignments = allStudents[i].assignments;
        if(assignments == undefined) {
          assignments = [];
        }
        assignments.push(emptyAssignment);
        Student.update({_id: allStudents[i]._id},
        {
          $set: {assignments: assignments}
        });
      }
    }
    window.location = "/assignments";
  }
});
