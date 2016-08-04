import { Student } from '../../collections/student.js';
import { Assignments } from '../../collections/assignments.js';

Template.studentsAllAssignments.onCreated(function() {
  Meteor.subscribe('Student');
  Meteor.subscribe('Assignments');
});

var formatPointsReceived = function(pointsReceived) {
    if(pointsReceived < 0) {
        return "Not Graded";
    }
    return pointsReceived;
}

var getStatus = function(studentAssignment, assignment) {
    var status = "Incomplete";
    var today = new Date();
	today.setHours(0, 0, 0, 0);
	
    if(studentAssignment.completed) {
        status = "Complete";
    } else if(new Date(assignment.dueDate) < today) {
        status = "Late";
    }
    return status;
}

var getCompletedAssignmentLink = function(studentAssignment) {
    var link = undefined;
    if(studentAssignment.completed && studentAssignment.link != "") {
        link = studentAssignment.link;
    }
    return link;
}

// Provides the table template with all the listed assignments
Template.studentsAllAssignments.helpers({
    assignments: function() {
        var formattedAssignments, allAssignments, i;
        formattedAssignments = [];

        var student = Student.findOne({userId: Meteor.user()._id});

        studentAssignments = student.assignments;
        for (i = 0; i < studentAssignments.length; i++) {
            var assignment, assignmentUrl, formattedAssignment;
            assignment = Assignments.findOne({_id: studentAssignments[i].assignmentId});

            assignmentUrl = "/assignments/single/" + assignment._id;

            formattedAssignment = {
                title: assignment.title,
                dueDate: assignment.dueDate.getMonth() + "/" + assignment.dueDate.getDate() + "/" +  assignment.dueDate.getFullYear(),
                assigner: assignment.assigner,
                status: getStatus(studentAssignments[i], assignment),
                pointsPossible: assignment.pointsPossible,
                pointsReceived: formatPointsReceived(studentAssignments[i].pointsReceived),
                url: assignmentUrl,
                completedAssignmentLink: getCompletedAssignmentLink(studentAssignments[i])
            }
            formattedAssignments.push(formattedAssignment);
        }
        //Sort the formattedAssignments array by their dueDate
        formattedAssignments.sort(function(a, b) {
            return a.dueDate > b.dueDate;
        });
        return formattedAssignments;
    }
});
