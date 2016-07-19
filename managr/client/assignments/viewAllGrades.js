import { Student } from '../../collections/student.js';
import { Assignments } from '../../collections/assignments.js';

Template.viewAllGrades.onCreated(function() {
    Meteor.subscribe('Student');
    Meteor.subscribe('Assignments');
});

var getAssignmentsCompleted = function(student) {
    var assignments = student.assignments;
    var completed = 0;
    for(var i = 0; i < assignments.length; i++) {
        if(assignments[i].completed) {
            completed++;
        }
    }
    return completed;
}

var getPointsReceived = function(student) {
    var assignments = student.assignments;
    var pointsReceived = 0;
    for(var i = 0; i < assignments.length; i++) {
        if(assignments[i].pointsReceived > 0) {
            pointsReceived += assignments[i].pointsReceived;
        }
    }
    return pointsReceived;
}

var getPointsPossible = function(student) {
    var assignments = student.assignments;
    var pointsPossible = 0;
    for(var i = 0; i < assignments.length; i++) {
        var assignment = Assignments.findOne({_id: assignments[i].assignmentId});
        pointsPossible += assignment.pointsPossible;
    }
    return pointsPossible;
}

var getOverallGrade = function(student) {
    if(getPointsPossible(student) <= 0) return "N/A";
    var overallGrade = (getPointsReceived(student) / getPointsPossible(student)) * 100;
    return overallGrade.toFixed(2) + "%";
}

Template.viewAllGrades.helpers({
    "students": function() {
        var studentData = [];
        Student.find({}).forEach(function(student) {
          studentData.push({
            studentName: student.name,
            assignmentsCompleted: getAssignmentsCompleted(student),
            allAssignments: student.assignments.length,
            pointsReceived: getPointsReceived(student),
            pointsPossible: getPointsPossible(student),
            overallGrade: getOverallGrade(student)
          });
        });
        studentData.sort(function(a,b) {return a.studentName.localeCompare(b.studentName);});
        return studentData;
    }
});
