import { Student } from '../../collections/student.js';
import { AttendanceUtilities } from './attendanceUtilities.js';

Template.aboutme.onCreated(function() {
  var self = this;
  self.autorun(function() {
    self.subscribe('Student');
	self.subscribe('Globals');
  });
});

Template.aboutme.helpers({
  student: function() {
    let userId = FlowRouter.getParam("id");
    let student = Student.findOne({"_id": userId});
    student.github = "https://github.com/" + student.github;
    student.address = student.address.street + " " + student.address.city + " " + student.address.state + " " + student.address.zipCode;
    student.parentNames = student.parentNames[0] + " and " + student.parentNames[1];
    student.hasBlog = ((student.blog != "") && (student.blog != undefined));
    return student;
  },
  strengths: function() {
    let userId = FlowRouter.getParam("id");
    return strengths = Student.findOne({"_id": userId}).strengths;
  },
  ep: function() {
    let userId = FlowRouter.getParam("id");
    return ep = Student.findOne({"_id": userId}).ep10;
  }
});

Template.aboutme.events({
	"click .blogButton"(event){
		let userId = FlowRouter.getParam("id");
		let blogURL = Student.findOne({"_id": userId}).blog;
		FlowRouter.go(blogURL);
	},
	"click .editAboutMe" (event) {
		FlowRouter.go("/profile/edit/" + FlowRouter.getParam("id"));
	},
	"click .editAttendance" (event) {
		FlowRouter.go("/attendance/edit/" + FlowRouter.getParam("id"));
	},
	"click .profileBack" (event) {
		FlowRouter.go("/profiles/");
	}
});

Template.attendanceBody.onCreated(function() {
  var self = this;
  self.autorun(function() {
    self.subscribe('Student');
	self.subscribe('Globals');
  });
  Template.instance().attendancePage = new ReactiveVar(0);
  AttendanceUtilities.attendancePage = 0;
});

Template.attendanceBody.helpers({
	headers: function() {
		//Force reactivity.
		var attendancePage = Template.instance().attendancePage.get();
		return AttendanceUtilities.headers();
	},
  attendance: function() {
    let userId = FlowRouter.getParam("id");
    let attendance = [];
    let rawAttendance = Student.findOne({"_id": userId}).attendance;
	//Force reactivity.
	var attendancePage = Template.instance().attendancePage.get();
	return AttendanceUtilities.attendance(rawAttendance);
  },
  emptyAttendance: function() {
	var attendancePage = Template.instance().attendancePage.get();
	return AttendanceUtilities.emptyAttendance();
  }
});

Template.attendanceBody.events({
	'click #leftCaretButton':function() {
		AttendanceUtilities.decrementPage();
		Template.instance().attendancePage.set(AttendanceUtilities.attendancePage);
	},
	'click #rightCaretButton':function() {
		AttendanceUtilities.incrementPage();
		Template.instance().attendancePage.set(AttendanceUtilities.attendancePage);
	}
});

Template.studentName.onCreated(function() {
  var self = this;
  self.autorun(function() {
    self.subscribe('Student');
  });
});

Template.studentName.helpers({
  studentName: function() {
    let userId = FlowRouter.getParam("id");
    let studentName = {};
    studentName = Student.findOne({"_id": userId});
    return studentName;
  }
});
