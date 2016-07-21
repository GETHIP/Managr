import { Student } from '../../collections/student.js';

Template.gradeTable.onCreated(function() {
		Meteor.subscribe("Student");
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
				function recievedPointsFormat(possible) {
					if (possible < 0) {
						return "Not Graded";
					}
					else {
						return possible;
					}
				}
				function calculatePercentage (received,possible) {
					if (received < 0) {
						return "N/A";
					}
					else {
						return ((received / possible) * 100).toFixed(1) + "%";
					}
				}

        studentData.push({
          studentName: student.name,
					recievedPoints: recievedPointsFormat(studentAssignments[index].pointsReceived),
					possiblePoints: " / " + assignment.pointsPossible.toString(),
					studentPercent: calculatePercentage(studentAssignments[index].pointsReceived,assignment.pointsPossible)
				});
      }
      return studentData;
    }
});
