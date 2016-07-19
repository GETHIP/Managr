import { Instructor } from '../collections/instructor.js';
import { Student } from '../collections/student.js';

export function isStudent() {
  if(Meteor.user() == null) {
    return false;
  }
  return Roles.userIsInRole(Meteor.user()._id, "student");
}

export function isInstructor() {
  if(Meteor.user() == null) {
    return false;
  }
  return Roles.userIsInRole(Meteor.user()._id, "instructor");
}

export function userIsValid() {
  if (Meteor.user() == null) {
    return false;
  }
  return !Roles.userIsInRole(Meteor.user()._id, "unconfirmed");
}

export function currentUserOrInstructor(id) {
  if (Meteor.user() == null) {
    return false;
  }
  return id == Meteor.user()._id || Roles.userIsInRole(Meteor.user()._id, "instructor");
}

export function nameOfUser(id) {
	var instructor = Instructor.findOne({userId: id});
	if (instructor != undefined) {
		return instructor.name;
	} else {
		var student = Student.findOne({userId: id});
		if (student != undefined) {
			return student.name;
		} else {
			return undefined;
		}
	}
}