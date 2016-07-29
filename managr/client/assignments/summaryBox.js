import { Student } from '../../collections/student.js';
import { Assignments } from '../../collections/assignments.js';

Template.SummaryBox.onCreated(function() {
    Meteor.subscribe('Student');
    Meteor.subscribe('Assignments');
});

var getCurrentStudent = function() {
    return Student.findOne({userId: Meteor.user()._id});
}

var getNumberOfCompleted = function() {
    var student = getCurrentStudent();
    if(student == undefined) return 0;

    var studentAssignments = student.assignments;
    var numberOfCompleted = 0;
    for(var i = 0; i < studentAssignments.length; i++) {
        if(studentAssignments[i].completed) {
            numberOfCompleted++;
        }
    }
    return numberOfCompleted;
}

var getPointsReceived = function() {
    var student = getCurrentStudent();
    if(student == undefined) return 0;

    var studentAssignments = student.assignments;
    var pointsReceived = 0;
    for(var i = 0; i < studentAssignments.length; i++) {
        if(studentAssignments[i].pointsReceived > 0) {
            pointsReceived += studentAssignments[i].pointsReceived;
        }
    }
    return pointsReceived;
}

var getPointsPossible = function() {
    var student = getCurrentStudent();
    if(student == undefined) return 0;

    var assignments = student.assignments;
    var pointsPossible = 0;
    for(var i = 0; i < assignments.length; i++) {
        var assignment = Assignments.findOne({_id: assignments[i].assignmentId});
        pointsPossible += assignment.pointsPossible;
    }
    return pointsPossible;
}

//This method doesn't remove -1 from the input
var getTruePointsReceived = function() {
  var student = getCurrentStudent();
  if(student == undefined) return 0;

  var studentAssignments = student.assignments;
  var truePointsReceived = 0;
  for(var i = 0; i < studentAssignments.length; i++) {
      truePointsReceived += studentAssignments[i].pointsReceived;
  }
  return truePointsReceived;
}

Template.SummaryBox.helpers({
    completeAssignments: function() {
        return getNumberOfCompleted();
    },
    incompleteAssignments: function() {
        var student = getCurrentStudent();
        if(student == undefined) return 0;

        var assignments = student.assignments;
        return assignments.length - getNumberOfCompleted();
    },
    pointsReceived: function() {
        return getPointsReceived();
    },
    pointsPossible: function() {
        return getPointsPossible();
    },
    overallGrade: function() {
        //Edge cases to ensure that NaN does not show up, but rather N/A
        if(getPointsPossible() <= 0){
            return "N/A";
        }
        var numberOfCompleted = getNumberOfCompleted();
        if(numberOfCompleted <= 0 && getPointsReceived() <= 0){
            return "N/A";
        }
        if(numberOfCompleted > 0) {
            var truePointsReceived = getTruePointsReceived();
            if(-truePointsReceived == numberOfCompleted) {
                return "N/A";
            }
        }

        var today = new Date();
        var student = getCurrentStudent();
        var studentAssignments = student.assignments;
        var pointsReceived = 0;
        var pointsPossible = 0;
        for(var i = 0; i < studentAssignments.length; i++) {
            var assignment = Assignments.findOne({_id: studentAssignments[i].assignmentId});
            //If it's overdue then we just add pointsPossible because the student hasn't marked it as completed and therefore has received no score, but it's late so we count it as a zero
            if(assignment.dueDate < today && !studentAssignments[i].completed && studentAssignments[i].pointsReceived < 0) {
                pointsPossible += assignment.pointsPossible;
            } else {
                if(studentAssignments[i].pointsReceived >= 0) {
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
});
