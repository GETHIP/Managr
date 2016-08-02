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

function pushIfValid(arr, value) {
	if (value != undefined) {
		arr.push(value);
	}
}

function padEmptyStrings(arr, length) {
	while (arr.length < length) {
		arr.push("");
	}
}

function populateStudentObject(student) {

	//We assume all keys are lowercase.
	//Users should call makeObjectKeysLowercase
	//before passing an object to this function.

	if (student.name == undefined) {
		if (student["firstname"] == undefined || student["lastname"] == undefined) {
			return "A student is missing a name";
		} else {
			student.name = student["firstname"] + " " + student["lastname"];
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

	var parentNames = [];
	pushIfValid(student["Parent 1"]);
	pushIfValid(student["Parent 2"]);
	padEmptyStrings(parentNames, 2);
	student["parentnames"] = parentNames;
	
	if (student["description"] == undefined) {
		student["description"] = "none";
	}

	if (student["grade"] == undefined) {
		student["grade"] = 0;
	}

	if (student["gethipyear"] == undefined) {
		student["gethipyear"] = 0;
	}

	if (student["phonenumber"] == undefined) {
		student["phonenumber"] = "none";
	}

	if (student["blog"] == undefined) {
		student["blog"] = "none";
	}

	var strengths = [];
	for (var i = 1; i <= 5; i++) {
		pushIfValid(strengths, student["strength " + i]);
	}
	padEmptyStrings(strengths, 5);
	student["strengths"] = strengths;
	console.log("strengths: ", strengths);
	
	//It doesn't make sense to supply a value for attendance, so
	//we just overwrite whatever is there.
	student["attendance"] = [false, false, false, false, false, false, false, false, false, false, false, false]

	if (student["github"] == undefined) {
		student["github"] = "none";
	}

	if (student["tshirtsize"] == undefined) {
		student["tshirtsize"] = "none";
	}
	
	var ep10 = [];
	for (var i = 1; i <= 4; i++) {
		pushIfValid(ep10, student["ep 10 " + i]);
	}
	padEmptyStrings(ep10, 4);
	student["ep10"] = ep10;
	console.log("ep 10: ", ep10);
	if (student["picture"] == undefined) {
		student["picture"] = "none";
	}

	var address = {
		"street": "none",
		"city": "none",
		"state": "none",
		"zipCode": 0
	};
	if (student["street"] != undefined) {
		address["street"] = student["street"];
	}
	if (student["city"] != undefined) {
		address["city"] = student["city"];
	}
	if (student["state"] != undefined) {
		address["state"] = student["state"];
	}
	if (student["zipcode"] != undefined) {
		if (student["zipcode"] != "") {
			address["zipCode"] = student["zipcode"];
		}
	}
	student.address = address;
	
	//No message means no error.
	return "";
}

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
			console.log("Data: ", data);
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
		}
	});

}