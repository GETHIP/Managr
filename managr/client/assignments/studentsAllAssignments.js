import { Student } from '../../collections/student.js';
import { Assignments } from '../../collections/assignments.js';

Template.studentsAllAssignments.onCreated(function() {
  Meteor.subscribe('Student');
  Meteor.subscribe('Assignments');
});

// Provides the table template with all the listed assignments
Template.studentsAllAssignments.helpers({
    assignments: function() {
        var formattedAssignments, allAssignments, i;
        formattedAssignments = [];

        var student = Student.findOne({userId: Meteor.user()._id});

        console.log("STUDENT: " + student);
        console.log("NAME: " + student.name);
        console.log("ASSIGNMENTS: " + student.assignments);

        studentAssignments = student.assignments;
        for (i = 0; i < studentAssignments.length; i++) {
            var assignment, assignmentUrl, formattedAssignment;
            assignment = Assignments.findOne({_id: studentAssignments[i].assignmentId});
            
            assignmentUrl = "/assignments/single/" + assignment._id;

            formattedAssignment = {
                title: assignment.title,
                description: assignment.description,
                dueDate: (assignment.dueDate.getMonth() + 1) + "/" + (assignment.dueDate.getDate() + 1) + "/" +  assignment.dueDate.getFullYear(),
                assigner: assignment.assigner,
                dateAssigned: (assignment.dateAssigned.getMonth() + 1) + "/" + assignment.dateAssigned.getDate()  + "/" +  assignment.dateAssigned.getFullYear(),
                pointsPossible: assignment.pointsPossible,
                url: assignmentUrl
            }
            formattedAssignments.push(formattedAssignment);
        }
        return formattedAssignments;
    }
});
