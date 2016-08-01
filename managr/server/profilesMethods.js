import { Meteor } from 'meteor/meteor';
import { Posts } from '../collections/blogPosts.js';
import { Comments } from '../collections/comments.js';
import { Assignments } from '../collections/assignments.js';
import { Instructor } from '../collections/instructor.js';
import { Student } from '../collections/student.js';
import { Drafts } from '../collections/drafts.js';
import { isStudent, isInstructor, userIsValid, currentUserOrInstructor, nameOfUser } from '../lib/permissions.js';

function generateUsername(name) {
	var names = name.split(" ");
	var username = "";
	for (i in names) {
		username += names[i];
		if (i < names.length - 1) {
			username += "_"
		}
	}
	return username;
}

function generatePassword(name) {
	return "G3tH1PPr0gram"
}

//We need this so instructors can upload
//case-insensitive csv files.
function makeObjectKeysLowercase(obj) {
	var keys = Object.keys(obj);
	var i = 0;
	var lowercaseObj = {};
	for (i = 0; i < keys.length; i++) {
		var key = keys[i];
		lowercaseObj[key.toLowerCase()] = obj[key];
	}
	return lowercaseObj;
}

function populateStudentObject(student) {

	//We assume all keys are lowercase.
	//Users should call makeObjectKeysLowercase
	//before passing an object to this function.

	if (student.name == undefined) {
		if (student["first name"] == undefined || student["last name"] == undefined) {
			return "A student is missing a name";
		} else {
			student.name = student["first name"] + " " + student["last name"];
		}
	}

	if (student.school == undefined) {
		student.school = "none";
	}

	if (student.age == undefined) {
		student.age = 0;
	}

	if (student.email == undefined) {
		student.email = "none@none";
	}

	if (student.parentnames == undefined) {
		student.parentnames = ["none", "none"]
	}

	if (student.description == undefined) {
		student.description = "none";
	}

	if (student.grade == undefined) {
		student.grade = 0;
	}

	if (student.gethipyear == undefined) {
		student.gethipyear = 0;
	}

	if (student.phonenumber == undefined) {
		student.phonenumber = "none";
	}

	if (student.blog == undefined) {
		student.blog = "none";
	}

	if (student.strengths == undefined) {
		student.strengths = ["Achiever", "Activator", "Analytical", "Arranger", "Competition"];
	}

	if (student.attendance == undefined) {
		student.attendance = [false, false, false, false, false, false, false, false, false, false, false, false]
	}

	if (student.github == undefined) {
		student.github = "none";
	}

	if (student.tshirtsize == undefined) {
		student.tshirtsize = "none";
	}

	if (student.ep10 == undefined) {
		student.ep10 = [undefined];
	}

	if (student.picture == undefined) {
		student.picture = "none";
	}

	if (student.address == undefined) {
		student.address = {
			street: "none",
			zipCode: 0,
			city: "none",
			state: "none"
		}
	}
	//No message means no error.
	return "";
}

export function profilesMethods() {

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
					assignments: []
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
			console.log(generateUsername(data.name));
			console.log("Data: ", data);
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
				"assignments": []
			});
			return errorMessage;
		},
		 'updateStudent': function(id, data){
		 	Student.update({_id: id},{$set: data});
		 },
		'updateAttendance':function(id, attendance) {
			if (!currentUserOrInstructor(id)) {
				return;
			}
			Student.update({userId: id}, { $set: { attendance: attendance } });
		},
		'updateProfilePicture':function(id, picture) {
			var student = Student.findOne({_id: id});
			if (student.userId == Meteor.userId()) {
				Student.update({_id: id, userId: Meteor.userId()}, { $set: { picture: picture }});
			} else if (isInstructor()) {
				Student.update({_id: id}, { $set: { picture: picture }});
			}
		}
	});
}
