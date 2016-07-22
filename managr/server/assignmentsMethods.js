import { Meteor } from 'meteor/meteor';
import { Posts } from '../collections/blogPosts.js';
import { Comments } from '../collections/comments.js';
import { Assignments } from '../collections/assignments.js';
import { Instructor } from '../collections/instructor.js';
import { Student } from '../collections/student.js';
import { Drafts } from '../collections/drafts.js';
import { isStudent, isInstructor, userIsValid, currentUserOrInstructor, nameOfUser } from '../lib/permissions.js';

export function assignmentsMethods() {
	Meteor.methods({
		'removeAssignment':function(assignmentId) {
			if (!isInstructor()) {
				return;
			}
			var allStudents = Student.find({}).fetch();
			allStudents.forEach(function(student) {
				var assignments = student.assignments;
				for(var i = 0; i < assignments.length; i++) {
					if(assignments[i].assignmentId == assignmentId) {
						assignments.splice(i, 1);
						Student.update({_id: student._id}, {
							$set: {assignments: assignments}
						});
						break;
					}
				}
			});
			Assignments.remove(assignmentId);
		},
		'submitAssignment':function(assignmentId) {
			var student = Student.findOne({userId: Meteor.user()._id});
			if (student != undefined) {
				var studentAssignments = student.assignments;
				for(var i = 0; i < studentAssignments.length; i++) {
					if(studentAssignments[i].assignmentId == assignmentId) {
						studentAssignments[i].completed = true;
						var successful = Student.update({userId: Meteor.user()._id}, {
							$set: {
								assignments: studentAssignments
							}
						});
						break;
					}
				}
			}
		},
		'createAssignment':function(title, description, dueDate, pointsPossible) {
			if (!isInstructor()) {
				return;
			}
			var assignmentId = Assignments.insert({
				title: title,
				description: description,
				dueDate: dueDate,
				assigner: Instructor.findOne({userId: Meteor.user()._id}).name,
				dateAssigned: new Date(),
				pointsPossible: pointsPossible
			});
			Meteor.call("addEmptyAssignmentToAllStudents", assignmentId);
		},
		'addEmptyAssignmentToAllStudents':function(assignmentId) {
			 if (!isInstructor()) {
				 return;
			 }
			 //A default template for a grade that has no score but must get added to the students
			 var emptyAssignment = {
				assignmentId: assignmentId,
				pointsReceived: -1,
				completed: false
			 };

			 var allStudents = Student.find({}).fetch();
			 if(allStudents.length > 0) {
			   for(var i = 0; i < allStudents.length; i++) {
				 var assignments = allStudents[i].assignments;
				 if(assignments == undefined) {
				   assignments = [];
				 }
				 assignments.push(emptyAssignment);
				 Student.update({_id: allStudents[i]._id},
				 {
				   $set: {assignments: assignments}
				 });
			   }
			 }
		},
		'updateAssignment':function(assignmentId, title, description, dueDate, pointsPossible) {
			var assignment = Assignments.findOne({_id: assignmentId});
			var assigner = Instructor.findOne({userId: Meteor.user()._id}).name;

			Assignments.update({_id:assignment._id, authorId: Meteor.user()._id}, {
				$set: {
					title: title,
					description: description,
					dueDate: dueDate,
					assigner: assigner,
					dateAssigned: new Date(),
					pointsPossible: pointsPossible
				}
			});
		},
		'updateGradeForStudent': function(studentId, assignmentId, newGrade) {
			var student = Student.findOne({_id: studentId});

			if(student != undefined) {
				var studentAssignments = student.assignments;
				for(var j = 0; j < studentAssignments.length; j++) {
					if(studentAssignments[j].assignmentId == assignmentId) {
						studentAssignments[j].pointsReceived = newGrade;
						Student.update({_id: student._id}, {
							$set: {
								assignments: studentAssignments
							}
						});
						break;
					}
				}
			}
		}

		});
}