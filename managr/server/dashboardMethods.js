import { Meteor } from 'meteor/meteor';
import { Posts } from '../collections/blogPosts.js';
import { Comments } from '../collections/comments.js';
import { Assignments } from '../collections/assignments.js';
import { Instructor } from '../collections/instructor.js';
import { Student } from '../collections/student.js';
import { Drafts } from '../collections/drafts.js';
import { Globals } from '../collections/globals.js';
import { isStudent, isInstructor, userIsValid, currentUserOrInstructor, nameOfUser } from '../lib/permissions.js';
import { generateUsername, generatePassword, makeObjectKeysLowercase,
		pushIfValid, padEmptyStrings, populateStudentObject } from './dashboardUtilities.js';
		
export function dashboardMethods() {

	Meteor.methods({
		'deleteUser': function(userId) {
			if (!isInstructor()) {
				return;
			}
			if (userId == Meteor.userId()) {
				return;
			}
			Meteor.users.remove({_id: userId});

			//Only one of these will actually have any affect, because
			//a user can only be a student or an instructor.
			Student.remove({userId: userId});
			Instructor.remove({userId: userId});
		},
		'createUserAccount': function(user) {
			if (!isInstructor()) {
				return;
			}
			if (!user.roles.includes('instructor') && !user.roles.includes('student')) {
				return;
			}
			let account = Accounts.createUser({
				username: user.username,
				password: user.password
			});

			Roles.addUsersToRoles(account, user.roles);

			if (user.roles.includes('instructor')) {
				Instructor.insert({
					name: user.name,
					picture: "x",
					strengths: ["Achiever", "Activator", "Analytical", "Arranger", "Competition"],
					description: "none",
					email: "none",
					userId: account,
					drafts: []
				});
			} else if (user.roles.includes('student')) {
				//It's guaranteed that a non-instructor user
				//is a student, but we're just being explicit.
				Student.insert({
					"name": user.name,
					"userId": account,
					"school": "School",
					"age": 0,
					"email": "none",
					"parentNames": ["none", "none"],
					"description": "none",
					"grade": 0,
					"getHipYear": 0,
					"phoneNumber": "none",
					"strengths": ["Achiever", "Activator", "Analytical", "Arranger", "Competition"],
					"attendance": [false, false, false, false, false, false, false, false, false, false, false, false],
					"github": "none",
					"tshirtSize": "none",
					"blog": "none",
					"ep10": [undefined],
					"picture": "x",
					"address": {
						"street": "none",
						"zipCode": 0,
						"state": "none",
						"city": "none"
					},
					"assignments": [],
					"isArchived": false
				});
			}
		},
		'addStudent': function(data){
			if (!isInstructor()) {
				return false;
			}
			data = makeObjectKeysLowercase(data);
			var errorMessage = populateStudentObject(data);
			if (errorMessage != "") {
				console.log(errorMessage);
				return errorMessage;
			}

			data.id = Accounts.createUser({
				username: generateUsername(data.name),
				password: generatePassword(data.name)
			});
			Roles.addUsersToRoles(data.id, 'student');
			Student.insert({
				"name": data.name,
				"userId": data.id,
				"school": data.school,
				"age": data.age,
				"email": data.email,
				"parentNames": data.parentnames,
				"description": data.description,
				"grade": data.grade,
				"getHipYear": data.gethipyear,
				"phoneNumber": data.phonenumber,
				"blog": data.blog,
				"strengths": data.strengths,
				"attendance": data.attendance,
				"github": data.github,
				"tshirtSize": data.tshirtsize,
				"ep10": data.ep10,
				"picture": data.picture,
				"address": data.address,
				"assignments": [],
				"isArchived": false
			}, { removeEmptyStrings: false });
			return errorMessage;
		},
		'archiveStudent':function(id, isArchived) {
			if (!isInstructor()) {
				return;
			}
			//This does nothing if you try to archive, say,
			//an instructor, so we have no need to verify
			//that the id is a student.
			Student.update({ userId: id }, { $set: { isArchived: isArchived } });
		},
		'updateNumberOfWeeks':function(numberOfWeeks) {
			if (!isInstructor()) {
				return;
			}
			if (numberOfWeeks <= 0) {
				return;
			}
			//Only one global object, so updating all only affects the one.
			Globals.update({}, { $set: { numberOfWeeks: numberOfWeeks } });
			var students = Student.find().fetch();
			for (i in students) {
				while (students[i].attendance.length < numberOfWeeks) {
					students[i].attendance.push(false);
				}
				if (students[i].attendance.length > numberOfWeeks) {
					students[i].attendance.splice(numberOfWeeks);
				}
				Student.update({_id: students[i]._id}, { $set: { attendance: students[i].attendance } });
			}
		},
		'resetAttendance':function() {
			if (!isInstructor()) {
				return;
			}
			var numberOfWeeks = Globals.numberOfWeeks();
			if (numberOfWeeks <= 0) {
				return;
			}
			var attendance = [];
			for (var i = 0; i < numberOfWeeks; i++) {
				attendance.push(false);
			}
			Student.update({}, { $set: { attendance: attendance } }, { multi: true });
		}
	});
}