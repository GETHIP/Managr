import { Student } from '../../collections/student.js';

Template.gradeTable.onCreated(function() {
		Meteor.subscribe("Student");
});

Template.adminSingleAssignment.events({
		"click #updateGrades"(event) {
				event.preventDefault();

				var assignmentId = FlowRouter.getParam("id");

				var inputs = document.getElementsByTagName("INPUT");
				for(var i = 0; i < inputs.length; i++) {
		 				if(inputs[i].id == "" || inputs[i].value == "" || inputs[i].value == "Back") {
		 						continue;
		 				}

		 				var studentId = inputs[i].id;
						var newGradeString = inputs[i].value;
						var newGrade;
						if(isNaN(newGradeString)) {
								newGrade = -1;
						} else {
							newGrade = Number(inputs[i].value);
						}

						Meteor.call("updateGradeForStudent", studentId, assignmentId, newGrade);

						if(newGrade < 0) {
								inputs[i].value = "Not Graded";
						} else {
								inputs[i].value = newGrade;
						}
				}

				FlowRouter.go("/assignments/single/admin/" + assignmentId);
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

				//In the future, should assignments be made specific to only certain students, this line will prevent students without the assignment showing up in the table
				if (index <= -1) {
						continue;
				}

				function formatPointsReceived(possible) {
					if (possible < 0) {
						return "Not Graded";
					}
					else {
						return possible;
					}
				}
				function calculatePercentage (received, possible) {
					if (received < 0) {
						return "N/A";
					} else if(received >= 0 && possible == 0) {
						if(received == 0) {
							return "100%";
						} else {
							return received * 100 + "%";
						}
					}
					else {
						return ((received / possible) * 100).toFixed(1) + "%";
					}
				}

        studentData.push({
          	studentName: student.name,
						studentId: student._id,
						pointsReceived: formatPointsReceived(studentAssignments[index].pointsReceived),
						pointsPossible: assignment.pointsPossible.toString(),
						studentPercent: calculatePercentage(studentAssignments[index].pointsReceived, assignment.pointsPossible),
						completed: studentAssignments[index].completed
				});
      }
			studentData.sort(function(student1, student2) {
					return student1.studentName.localeCompare(student2.studentName);
			});
      return studentData;
    }
});