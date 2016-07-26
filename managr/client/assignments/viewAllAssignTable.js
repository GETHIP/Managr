import { Student } from '../../collections/student.js';
import { Assignments } from '../../collections/assignments.js';

Template.viewAllAssignTable.onCreated(function() {
    Meteor.subscribe("Assignments");
    Meteor.subscribe("Student");
});

var getNumberOfStudentsOnAssignment = function(assignment) {
    var allStudents = Student.find({}).fetch();
    var numberOfStudentsOnAssignment = 0;
    for(var i = 0; i < allStudents.length; i++) {
        var studentAssignments = allStudents[i].assignments;
        for(var j = 0; j < studentAssignments.length; j++) {
            if(studentAssignments[j].assignmentId == assignment._id) {
                numberOfStudentsOnAssignment++;
                break;
            }
        }
    }
    return numberOfStudentsOnAssignment;
}

var getNumberOfStudentsWhoCompletedTheAssignment = function(assignment) {
    var allStudents = Student.find({});
    var completed = 0;
    allStudents.forEach(function(student) {
        var studentAssignments = student.assignments;
        for(var i = 0; i < studentAssignments.length; i++) {
            if(studentAssignments[i].assignmentId == assignment._id && studentAssignments[i].completed) {
                completed++;
                break;
            }
        }
    });
    return completed;
}

var getAverageGrade = function(assignment) {
    var allStudents = Student.find({});
    var totalPoints = 0;
    var numberOfStudentsWhoHaveTheAssignmentedGraded = 0;
    allStudents.forEach(function(student) {
        var studentAssignments = student.assignments;
        for(var i = 0; i < studentAssignments.length; i++) {
          if(studentAssignments[i].assignmentId == assignment._id && studentAssignments[i].pointsReceived >= 0) {
              totalPoints += studentAssignments[i].pointsReceived;
              numberOfStudentsWhoHaveTheAssignmentedGraded++;
              break;
          }
        }
    });

    if(numberOfStudentsWhoHaveTheAssignmentedGraded <= 0) {
        return "N/A";
    }

    var averagePoints = totalPoints / numberOfStudentsWhoHaveTheAssignmentedGraded;
    var pointsPossible = assignment.pointsPossible;
    var averageGrade = averagePoints / pointsPossible * 100;

    if(isNaN(averageGrade)) {
        return "N/A";
    }

    return averageGrade.toFixed(2) + "%";
}

Template.viewAllAssignTable.helpers({
    assignments: function() {
        var formattedAssignments, allAssignments, i;
        formattedAssignments = [];

        allAssignments = Assignments.find({}).fetch();
        for (i = 0; i < allAssignments.length; i++) {
            var assignment, assignmentUrl, formattedAssignment;
            assignment = allAssignments[i];
            assignmentUrl = "/assignments/single/admin/" + assignment._id.valueOf();
            formattedAssignment = {
                title: assignment.title,
                studentsCompleted: getNumberOfStudentsWhoCompletedTheAssignment(assignment),
                allStudents: getNumberOfStudentsOnAssignment(assignment),
                averageGrade: getAverageGrade(assignment),
                url: assignmentUrl
            }
            formattedAssignments.push(formattedAssignment);
        }
        //sort these assignments by the date they were created
        formattedAssignments.sort(function(a, b) {
            return a.dateAssigned > b.dateAssigned;
        });
        return formattedAssignments;
    }
});
