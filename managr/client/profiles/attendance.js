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
	AttendanceUtilities.attendancePage = 0
	});

Template.attendanceUpdate.events({
	"submit .attendanceUpdate" (event) {
		event.preventDefault();
		let userId = FlowRouter.getParam("id");
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
		//This is no longer needed to actually run the function,
		//but it is needed to maintain reactivity.
		var attendancePage = Template.instance().attendancePage.get();
		let attendanceArray = Template.instance().attendance.get();
		if (attendanceArray == undefined) {
			return [];
		}
		return AttendanceUtilities.attendance(attendanceArray);
	},
	headers: function() {
		//This is no longer needed to actually run the function,
		//but it is needed to maintain reactivity.
		var attendancePage = Template.instance().attendancePage.get();
		return AttendanceUtilities.headers();
	},
	emptyAttendance: function() {
		//Force reactivity;
		var attendancePage = Template.instance().attendancePage.get();
		return AttendanceUtilities.emptyAttendance();
	}
});

Template.attendanceWeeksHeader.helpers({
  shouldBeHidden: function(side) {
    console.log(AttendanceUtilities.attendancePage);
  	if (AttendanceUtilities.attendancePage >= (Globals.numberOfWeeks() / AttendanceUtilities.attendanceColumnsPerPage)-1) {
  		return 'buttonHide';
  	}
  	if (AttendanceUtilities.attendancePage == 0) {
  		if (side == "right") {
  			return '';
  		} else {
  			return 'buttonHide';
  		}
  	}
  	if (Globals.numberOfWeeks() <= AttendanceUtilities.AttendanceColumnsPerPage) {
  		if (side == "left") {
  			return '';
  		} else {
  			return 'buttonHide';
  		}
  	}
  	return '';

   }
});
