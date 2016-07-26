import { Meteor } from 'meteor/meteor';
import { Posts } from '../collections/blogPosts.js';
import { Comments } from '../collections/comments.js';
import { Assignments } from '../collections/assignments.js';
import { Instructor } from '../collections/instructor.js';
import { Student } from '../collections/student.js';
import { Drafts } from '../collections/drafts.js';
import { isStudent, isInstructor, userIsValid, currentUserOrInstructor, nameOfUser } from '../lib/permissions.js';

export function profilesMethods() {
	
	Meteor.methods({
		'deleteUser': function(userId) {
			if (!isInstructor()) {
				return;
			}
			Meteor.users.remove({_id: userId});
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
					}
				});
			}
		},
		'addStudent': function(data){
			if (!isInstructor()) {
				return false;
			}
			 data.id = Accounts.createUser({
					username: data[3],
					password: "G3tH1pPr0gram"
			 });
			 Roles.addUsersToRoles(data.id, 'Student');
			 Student.insert({
				"name": data[0],
				"userId": data.id,
				"school": data[1],
				"age": data[2],
				"email": data[3],
				"parentNames": data[4],
				"description": data[5],
				"grade": data[6],
				"getHipYear": data[7],
				"phoneNumber": data[8],
				"blog": data[9],
				"strengths": [undefined],
				"attendance": [false, false, false, false, false, false, false, false, false, false, false, false],
				"github": "blank",
				"tshirtSize": "blank",
				"blog": "blank",
				"ep10": [undefined],
				"picture": "blank",
				"address": {
					"street": data[10],
					"zipCode": 68055,
					"state": "blank",
					"city": "blank"
				}
			 });
		 },
		 'updateStudent': function(id, data){
		 	Student.update({_id: id},{$set: data});
		 },
	});
}