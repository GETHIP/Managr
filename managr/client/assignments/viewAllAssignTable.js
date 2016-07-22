import { Student } from '../../collections/student.js';
import { Assignments } from '../../collections/assignments.js';

Template.viewAllAssignTable.onCreated(function() {
    Meteor.subscribe("Assignments");
    Meteor.subscribe("Student");
});

var getNumberOfStudents = function() {
    return Student.find({}).fetch().length;
}

var getNumberOfStudentsWhoCompletedTheAssignment = function(assignmentId) {
    var allStudents = Student.find({});
    var completed = 0;
    allStudents.forEach(function(student) {
        var assignments = student.assignments;
        for(var i = 0; i < assignments.length; i++) {
            if(assignments[i].assignmentId == assignmentId && assignments[i].completed) {
                completed++;
                break;
            }
        }
    });
    return completed;
}

var getAverageGrade = function(assignmentId) {
    var allStudents = Student.find({});
    var totalPoints = 0;
    var numberOfStudentsWhoHaveTheAssignmentedGraded = 0;
    allStudents.forEach(function(student) {
        var assignments = student.assignments;
        for(var i = 0; i < assignments.length; i++) {
          if(assignments[i].assignmentId == assignmentId && assignments[i].pointsReceived > 0) {
              totalPoints += assignments[i].pointsReceived;
              numberOfStudentsWhoHaveTheAssignmentedGraded++;
              break;
          }
        }
    });

    if(numberOfStudentsWhoHaveTheAssignmentedGraded <= 0) {
        return "N/A";
    }
    
    var averagePoints = totalPoints / numberOfStudentsWhoHaveTheAssignmentedGraded;
    var pointsPossible = Assignments.findOne({_id: assignmentId}).pointsPossible;
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
                studentsCompleted: getNumberOfStudentsWhoCompletedTheAssignment(assignment._id),
                allStudents: getNumberOfStudents(),
                averageGrade: getAverageGrade(assignment._id),
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
