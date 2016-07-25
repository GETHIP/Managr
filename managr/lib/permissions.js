import { Instructor } from '../collections/instructor.js';
import { Student } from '../collections/student.js';

export function userIsStudent(id) {
	if (id == null) {
		return false;
	}
	return Roles.userIsInRole(id, "student");
}

export function userIsInstructor(id) {
	if (id == null) {
		return false;
	}
	return Roles.userIsInRole(id, "instructor");
}

export function userIdIsValid(id) {
	if (id == null) {
		return false;
	}
	return !Roles.userIsInRole(Meteor.user()._id, "unconfirmed");
}

export function isStudent() {
	return userIsStudent(Meteor.userId());
}

export function isInstructor() {
	return userIsInstructor(Meteor.userId());
}

export function userIsValid() {
	return userIdIsValid(Meteor.userId());
}

export function isCurrentUser(id) {
  if (Meteor.user() == null) {
    return false;
  }
  return id == Meteor.user()._id;
}

export function currentUserOrInstructor(id) {
  if (Meteor.user() == null) {
    return false;
  }
  return isCurrentUser(id) || Roles.userIsInRole(Meteor.user()._id, "instructor");
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