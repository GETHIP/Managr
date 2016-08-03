import { Student } from '../../collections/student.js';
import { Globals } from '../../collections/globals.js';
import { AttendanceUtilities } from './attendanceUtilities.js';

Template.attendanceUpdate.onCreated(function() {
	var self = this;
	var templateInstance = Template.instance();
	templateInstance.attendance = new ReactiveVar([]);
	self.autorun(function() {
		self.subscribe('Student', function() {
			templateInstance.attendance.set(Student.findOne({_id: FlowRouter.getParam("id")}).attendance);
			//Get the template to re-render reactively.
			templateInstance.attendancePage.set(AttendanceUtilities.attendancePage);
		});
		self.subscribe('Globals');
	});
	Template.instance().attendancePage = new ReactiveVar(0);
	AttendanceUtilities.attendancePage = 0;
});

Template.attendanceUpdate.events({
	"submit .attendanceUpdate" (event) {
		event.preventDefault();
		let userId = FlowRouter.getParam("id");
		/*
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
		*/
		var student = Student.findOne({_id: userId});
		if (student != undefined) {
			Meteor.call('updateAttendance', student.userId, Template.instance().attendance.get());
		}
		
		FlowRouter.go("/profile/" + FlowRouter.getParam("id"));
	},
	"change #weekSelector" (event) {
		var attendance = Template.instance().attendance.get();
		attendance[this.index] = (event.target.value === "Present" || event.target.value === true);
		Template.instance().attendance.set(attendance);
	},
	"click #leftCaretButton" (event) {
		AttendanceUtilities.decrementPage();
		Template.instance().attendancePage.set(AttendanceUtilities.attendancePage);
	},
	"click #rightCaretButton" (event) {
		AttendanceUtilities.incrementPage();
		Template.instance().attendancePage.set(AttendanceUtilities.attendancePage);
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
		var attendancePage = Template.instance().attendancePage.get();
		let attendanceArray = Template.instance().attendance.get();
		if (attendanceArray == undefined) {
			return [];
		}
		var attendance = [];
		for (var i = AttendanceUtilities.startIndex(); i < AttendanceUtilities.endIndex() && i < attendanceArray.length; i++) {
			var attendanceObj = {
				index: i
			};
			if (attendanceArray[i]) {
				attendanceObj.selectedPresent = "selected";
				attendanceObj.selectedAbsent = "";
			} else {
				attendanceObj.selectedPresent = "";
				attendanceObj.selectedAbsent = "selected";
			}
			attendance.push(attendanceObj);
		}
		return attendance;
		/*
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
		*/
	},
	headers: function() {
		var attendancePage = Template.instance().attendancePage.get();
		var headers = [];
		for (var i = AttendanceUtilities.startIndex(); i < AttendanceUtilities.endIndex(); i++) {
			headers.push(i + 1);
		}
		return headers;
	},
});
