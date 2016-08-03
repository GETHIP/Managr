import { Meteor } from 'meteor/meteor';
import { Posts } from '../collections/blogPosts.js';
import { Comments } from '../collections/comments.js';
import { Assignments } from '../collections/assignments.js';
import { Instructor } from '../collections/instructor.js';
import { Student } from '../collections/student.js';
import { Drafts } from '../collections/drafts.js';
import { isStudent, isInstructor, userIsValid, currentUserOrInstructor, nameOfUser } from '../lib/permissions.js';

export function generateUsername(name) {
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

export function generatePassword(name) {
	return "G3tH1PPr0gram"
}

//We need this so instructors can upload
//case-insensitive csv files.
export function makeObjectKeysLowercase(obj) {
	var keys = Object.keys(obj);
	var i = 0;
	var lowercaseObj = {};
	for (i = 0; i < keys.length; i++) {
		var key = keys[i];
		lowercaseObj[key.toLowerCase()] = obj[key];
	}
	return lowercaseObj;
}

export function pushIfValid(arr, value) {
	if (value != undefined) {
		arr.push(value);
	}
}

export function padEmptyStrings(arr, length) {
	while (arr.length < length) {
		arr.push("");
	}
}

export function populateStudentObject(student) {

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
