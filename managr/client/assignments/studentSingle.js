import { Student } from '../../collections/student.js';
import { Assignments } from '../../collections/assignments.js';

Template.studentSingle.onCreated(function() {
    Meteor.subscribe('Student', function() {
        var studentId = FlowRouter.getParam("id");
        var student = Student.findOne({_id: studentId});
        if(student == undefined) {
            FlowRouter.go("/assignments/grades");
        }
    });
    Meteor.subscribe('Assignments');
});

var getStudent = function() {
    var studentId = FlowRouter.getParam("id");
    return Student.findOne({_id: studentId});
}

var getPointsReceived = function(studentAssignment) {
    if(studentAssignment.pointsReceived < 0) {
        return "N/A";
    }
    return studentAssignment.pointsReceived;
}

var getGrade = function(studentAssignment, assignment) {
    var today = new Date();
	today.setHours(0, 0, 0, 0);
    //Handle the case where the assignment is not completed, nor graded, and late
    if(!studentAssignment.completed && studentAssignment.pointsReceived < 0 && new Date(assignment.dueDate) < today) {
        return "0.00%";
    }

    //Odd case where bonus points are being added (potentially) or just a 0 points assignment
    if(assignment.pointsPossible == 0) {
        if(studentAssignment.completed) {
            if(studentAssignment.pointsReceived == 0) {
                return "100.00%";
            }
            return ((100 * studentAssignment.pointsReceived).toFixed(2) + "%");
        } else {
            return "N/A";
        }
    }

    //Finally the normal case, where it's just the expected calculation for grading
    if(studentAssignment.pointsReceived >= 0) {
        var grade = (studentAssignment.pointsReceived / assignment.pointsPossible * 100).toFixed(2);
        if(isNaN(grade)) {
            return "N/A";
        }
        return (grade + "%");
    }
}

var getStatus = function(studentAssignment, assignment) {
    var today = new Date();
	today.setHours(0, 0, 0, 0);

    if(studentAssignment.completed) {
        return "Complete";
    }
    if(new Date(assignment.dueDate) < today) {
        return "Late";
    }
    return "Incomplete";
}

Template.studentSingle.helpers({
    assignments: function() {
        var student = getStudent();
        var studentAssignments = student.assignments;
        var formattedAssignments = [];

        for(var i = 0; i < studentAssignments.length; i++) {
            var assignment = Assignments.findOne({_id: studentAssignments[i].assignmentId});
            if(assignment == undefined) {
                continue;
            }

            var formattedAssignment = {
                id: assignment._id,
                title: assignment.title,
                pointsPossible: assignment.pointsPossible,
                pointsReceived: getPointsReceived(studentAssignments[i]),
                grade: getGrade(studentAssignments[i], assignment),
                status: getStatus(studentAssignments[i], assignment)
            }
            formattedAssignments.push(formattedAssignment);
        }

        return formattedAssignments;
    },
    studentName: function() {
        var student = getStudent();
        if(student != undefined) {
            return student.name;
        }
        return "";
    }
});

Template.studentSingle.events({
    'click #updateGrades'(event) {
        event.preventDefault();

        var student = getStudent();
        var inputs = document.getElementsByTagName("INPUT");
        for(var i = 0; i < inputs.length; i++) {
            if(inputs[i].type != "number" || inputs[i].id == "" || inputs[i].value == "") {
                continue;
            }

            var assignmentId = inputs[i].id;
            var newGrade = formatNewGrade(inputs[i].value);

            Meteor.call("updateGradeForStudent", student._id, assignmentId, newGrade);

            setInputText(inputs[i], newGrade);
        }
    },
		'input .pointsReceievedField'(event) {
				const input = event.target;
				const assignmentId = input.id;
				const studentId = FlowRouter.getParam("id");

				//This workaround will prevent the input from default to 0, and will enable a person to leave it blank rather
				//than having to enter a value
				var newGrade;
				if(input.value != "") {
						newGrade = formatNewGrade(input.value);
						if(newGrade < 0) {
								return;
						}
				} else {
						newGrade = -1;
				}

				Meteor.call("updateGradeForStudent", studentId, assignmentId, newGrade);

				setInputText(input, newGrade);
		}
});


var setInputText = function(inputField, newGrade) {
		if(newGrade < 0) {
				inputField.value = "";
		} else {
				inputField.value = newGrade;
		}
}

var formatNewGrade = function(newGradeString) {
		var newGrade = Number(newGradeString);
		if(isNaN(newGradeString)) {
				newGrade = -1;
		}
		return newGrade;
}
