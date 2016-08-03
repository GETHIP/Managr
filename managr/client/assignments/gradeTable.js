import { Student } from '../../collections/student.js';
import { Assignments } from '../../collections/assignments.js';

Template.gradeTable.onCreated(function() {
		Meteor.subscribe("Student");
		Meteor.subscribe("Assignments");
});

Template.gradeTable.events({
		'click #updateGrades'(event) {
				event.preventDefault();

				const assignmentId = FlowRouter.getParam("id");

				var inputs = document.getElementsByTagName("INPUT");
				for(var i = 0; i < inputs.length; i++) {
		 				if(inputs[i].id == "" || inputs[i].value == "" || inputs[i].value == "Back") {
		 						continue;
		 				}

		 				var studentId = inputs[i].id;
						var newGrade = formatNewGrade(inputs[i].value);

						Meteor.call("updateGradeForStudent", studentId, assignmentId, newGrade);

						setInputText(inputs[i], newGrade);
				}
		},
		'keyup .pointsReceievedField'(event) {
				const input = event.target;
				const assignmentId = FlowRouter.getParam("id");
				const studentId = input.id;

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

Template.gradeTable.helpers({
    students: function() {
			var assignment = Assignments.findOne({_id: FlowRouter.getParam("id")});
			if (assignment == undefined) {
				return [];
			}

      var studentData = [];

			var allStudents = Student.find({}).fetch();
			for(var j = 0; j < allStudents.length; j++) {
				var student = allStudents[j];
				var studentAssignments = student.assignments;
				var index = -1;
				for(var i = 0; i < studentAssignments.length; i++) {
						if(studentAssignments[i].assignmentId == assignment._id) {
								index = i;
								break;
						}
				}

				//this line will prevent students without the assignment showing up in the table
				if (index <= -1) {
						continue;
				}

				var today = new Date();
				today.setMonth(today.getMonth() + 1);
				var status = "Incomplete";
				if(studentAssignments[index].completed) {
						status = "Completed";
				} else if(new Date(assignment.dueDate) < today) {
						status = "Late";
				}

        studentData.push({
          	studentName: student.name,
						studentId: student._id,
						pointsReceived: formatPointsReceived(studentAssignments[index].pointsReceived),
						pointsPossible: assignment.pointsPossible.toString(),
						studentPercent: calculatePercentage(studentAssignments[index].pointsReceived, assignment.pointsPossible),
						status: status,
						assignmentUrl: studentAssignments[index].link
				});
      }
			studentData.sort(function(student1, student2) {
					return student1.studentName.localeCompare(student2.studentName);
			});

      return studentData;
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

var formatPointsReceived = function(possible) {
		if (possible < 0) {
				return "";
		} else {
				return possible;
		}
}

var calculatePercentage = function(received, possible) {
		if (received < 0) {
				return "N/A";
		} else if(received >= 0 && possible == 0) {
				if(received == 0) {
						return "100.0%";
				} else {
						return (received * 100).toFixed(1) + "%";
				}
		}	else {
				return ((received / possible) * 100).toFixed(1) + "%";
		}
}
