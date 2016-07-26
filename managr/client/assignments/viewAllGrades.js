import { Student } from '../../collections/student.js';
import { Assignments } from '../../collections/assignments.js';

Template.viewAllGrades.onCreated(function() {
    Meteor.subscribe('Student');
    Meteor.subscribe('Assignments');
});

var getAssignmentsCompleted = function(student) {
    var studentAssignments = student.assignments;
    var completed = 0;
    for(var i = 0; i < studentAssignments.length; i++) {
        if(studentAssignments[i].completed) {
            completed++;
        }
    }
    return completed;
}

var getPointsReceived = function(student) {
    var studentAssignments = student.assignments;
    var pointsReceived = 0;
    var today = new Date();
    for(var i = 0; i < studentAssignments.length; i++) {
        if(studentAssignments[i].pointsReceived > 0 || studentAssignments[i].dueDate < today) {
            pointsReceived += studentAssignments[i].pointsReceived;
        }
    }
    return pointsReceived;
}

//This method doesn't remove -1 from the input
var getTruePointsReceived = function(student) {
  var studentAssignments = student.assignments;
  var truePointsReceived = 0;
  for(var i = 0; i < studentAssignments.length; i++) {
      truePointsReceived += studentAssignments[i].pointsReceived;
  }
  return truePointsReceived;
}

var getPointsPossible = function(student) {
    var assignments = student.assignments;
    var pointsPossible = 0;
    for(var i = 0; i < assignments.length; i++) {
        var assignment = Assignments.findOne({_id: assignments[i].assignmentId});
        if(assignment == undefined) {
            continue;
        }
        pointsPossible += assignment.pointsPossible;
    }
    return pointsPossible;
}

//This method is slightly more complex than what would be expected because we must account for overdue assignments as well
var getOverallGrade = function(student) {
    if(getPointsPossible(student) <= 0) return "N/A";
    var numberOfCompleted = getAssignmentsCompleted(student);
    if(numberOfCompleted <= 0 && getPointsReceived(student) <= 0) return "N/A";
    if(numberOfCompleted > 0) {
        //This will catch if all the assignments have been completed, but not yet graded
        var truePointsReceived = getTruePointsReceived(student);
        if(-truePointsReceived == numberOfCompleted) {
            return "N/A";
        }
    }

    var today = new Date();
    var studentAssignments = student.assignments;
    var pointsReceived = 0;
    var pointsPossible = 0;
    for(var i = 0; i < studentAssignments.length; i++) {
        var assignment = Assignments.findOne({_id: studentAssignments[i].assignmentId});
        //If it's overdue then we just add pointsPossible because the student hasn't marked it as completed and therefore has received no score, but it's late so we count it as a zero
        if(assignment.dueDate < today && !studentAssignments[i].completed) {
            pointsPossible += assignment.pointsPossible;
        } else {
            if(studentAssignments[i].pointsReceived > 0) {
                pointsReceived += studentAssignments[i].pointsReceived;
                pointsPossible += assignment.pointsPossible;
            }
        }
    }

    if(pointsPossible <= 0) {
        return "N/A";
    }
    
    var overallGrade = pointsReceived / pointsPossible * 100;
    return overallGrade.toFixed(2) + "%";
}

Template.viewAllGrades.helpers({
    students: function() {
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
        studentData.sort(function(student1, student2) {
            return student1.studentName.localeCompare(student2.studentName);
        });
        return studentData;
    }
});
