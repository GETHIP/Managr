import { Student } from '../../collections/student.js';

Template.attendanceUpdate.onCreated(function() {
  var self = this;
  self.autorun(function() {
    self.subscribe('Student');
  });
});

Template.attendanceUpdate.events({
	"submit .attendanceUpdate" (event) {
		event.preventDefault();
		let userId = FlowRouter.getParam("id");
		let data = [];
		for (i = 1; i < 13; i++) {
			let week = event.target["week" + i];
			let weeks = week.value;
			if (weeks === "Present" || weeks === true) {
				data.push(true);
			}
			if (weeks === "Absent" || weeks === false) {
				data.push(false);
			}
		}
		var student = Student.findOne({_id: userId});
		if (student != undefined) {
			Meteor.call('updateAttendance', student.userId, data);
		}
		FlowRouter.go("/profile/" + FlowRouter.getParam("id"));
	}
});

var wordNumbers = ["zero", "one", "two", "three", "four", "five", "six",
"seven", "eight", "nine", "ten", "eleven", "twelve"];

Template.attendanceUpdate.helpers({
	userParam: function() {
		var student = Student.findOne({_id: FlowRouter.getParam("id")});
		if (student == undefined) {
			return undefined;
		} else {
			return student.userId;
		}
	},
	attendance: function() {
		let userId = FlowRouter.getParam("id");
		let attendanceBoolean = Student.findOne({"_id": userId}).attendance;
		let attendance = {};
		for (i = 1; i < 13; i++) {
			if (attendanceBoolean[i - 1] === true) {
				attendance[wordNumbers[i] + "one"] = "selected";
				attendance[wordNumbers[i] + "two"] = "";
			} else {
				attendance[wordNumbers[i] + "one"] = "";
				attendance[wordNumbers[i] + "two"] = "selected";
			}
		};
		return attendance;
	}
});
