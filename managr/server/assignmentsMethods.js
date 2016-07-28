import { Meteor } from 'meteor/meteor';
import { Posts } from '../collections/blogPosts.js';
import { Comments } from '../collections/comments.js';
import { Assignments } from '../collections/assignments.js';
import { Instructor } from '../collections/instructor.js';
import { Student } from '../collections/student.js';
import { Drafts } from '../collections/drafts.js';
import { isStudent, isInstructor, userIsValid, currentUserOrInstructor, nameOfUser } from '../lib/permissions.js';
import { createStudentIdsArray }  from './groupsMethods.js';

export function assignmentsMethods() {
	Meteor.methods({
		'removeAssignment':function(assignmentId) {
			if (!isInstructor()) {
				return;
			}
			var allStudents = Student.find({}).fetch();
			for(var j = 0; j < allStudents.length; j++) {
				var studentAssignments = allStudents[j].assignments;
				for(var i = 0; i < studentAssignments.length; i++) {
					if(studentAssignments[i].assignmentId == assignmentId) {
						studentAssignments.splice(i, 1);
						Student.update({_id: allStudents[j]._id}, {
							$set: {assignments: studentAssignments}
						});
						break;
					}
				}
			}

			Assignments.remove(assignmentId);
		},
		'submitAssignment':function(assignmentId, assignmentUrl) {
			var student = Student.findOne({userId: Meteor.user()._id});
			if (student != undefined) {
				var studentAssignments = student.assignments;
				for(var i = 0; i < studentAssignments.length; i++) {
					if(studentAssignments[i].assignmentId == assignmentId) {
						studentAssignments[i].completed = true;
						studentAssignments[i].link = assignmentUrl;
						Student.update({userId: Meteor.user()._id}, {
							$set: {
								assignments: studentAssignments
							}
						});
						break;
					}
				}
			}
		},
		'createAssignment':function(title, description, dueDate, pointsPossible, groupIds, studentIds) {
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
			Meteor.call("addEmptyAssignmentToStudents", assignmentId, groupIds, studentIds);
		},
		'addEmptyAssignmentToStudents':function(assignmentId, groupIds, studentIds) {
			 if (!isInstructor()) {
				 return;
			 }
			 //A default template for a grade that has no score but must get added to the students
			 var emptyAssignment = {
				 assignmentId: assignmentId,
				 pointsReceived: -1,
				 completed: false
			 };

			 var studentIdsToAddAssignmentTo = createStudentIdsArray(groupIds, studentIds);

			 for(var i = 0; i < studentIdsToAddAssignmentTo.length; i++) {
				 var assignments = Student.findOne({_id: studentIdsToAddAssignmentTo[i]}).assignments;
			 	 if(assignments == undefined) {
				 	 assignments = [];
				 }
				 assignments.push(emptyAssignment);
				 Student.update({_id: studentIdsToAddAssignmentTo[i]},
				 {
				   $set: {assignments: assignments}
				 });
			 }
		},
		//originallyCheckedIds are the studentIds that originally had the assignment, we will use this to compare to
		//new studentIds and be able to remove the students taht no longer need it
		'updateAssignment':function(assignmentId, title, description, dueDate, pointsPossible, groupIds, studentIds, originallyCheckedIds) {
			var assignment = Assignments.findOne({_id: assignmentId});
			var assigner = Instructor.findOne({userId: Meteor.user()._id}).name;

			var assignmentToBeAdded = {
				assignmentId: assignmentId,
				pointsReceived: -1,
				completed: false
			};

			var studentIdsToAddAssignmentTo = createStudentIdsArray(groupIds, studentIds);
			console.log("STUDENT IDS: " + studentIdsToAddAssignmentTo);

			//This next case handles the case where an instructor unassigns a student an assignment
			for(var j = 0; j < originallyCheckedIds.length; j++) {
				if(studentIdsToAddAssignmentTo.indexOf(originallyCheckedIds[j]) == -1) {
					//We must remove the studentId originallyCheckedIds[j] because its not in the studentIdsToAddAssignmentTo
					var student = Student.findOne({_id: originallyCheckedIds[j]});
					if(student == undefined) {
						continue;
					}

					var studentAssignments = student.assignments;
					for(var k = 0; k < studentAssignments.length; k++) {
						if(studentAssignments[k].assignmentId == assignmentId) {
							studentAssignments.splice(k, 1);
							var success = Student.update({_id: student._id}, {
								$set: {
									assignments: studentAssignments
								}
							});
							break;
						}
					}
				}
			}

			//Next we add the assignment to those that don't have it
			for(var i = 0; i < studentIdsToAddAssignmentTo.length; i++) {
				var student = Student.findOne({_id: studentIdsToAddAssignmentTo[i]});
				if(student == undefined) {
					continue;
				}
				var studentAssignments = student.assignments;

				var addAssignmentToStudent = true;
				for(var j = 0; j < studentAssignments.length; j++) {
					if(studentAssignments[j].assignmentId == assignment._id) {
						addAssignmentToStudent = false;
						break;
					}
				}

				//If they don't have the assignment, it needs to be added now
				if(addAssignmentToStudent) {
					studentAssignments.push(assignmentToBeAdded);
					Student.update({_id: student._id}, {
						$set: {
							assignments: studentAssignments
						}
					});
				}
			}


			Assignments.update({_id: assignment._id}, {
				$set: {
					title: title,
					description: description,
					dueDate: dueDate,
					assigner: assigner,
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
