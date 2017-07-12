import { Student } from '../../collections/student.js';
import { Globals } from '../../collections/globals.js';
import { AttendanceUtilities } from './attendanceUtilities.js';

Template.profileAttendance.onCreated(function() {
	var self = this;
	self.autorun(function() {
		self.subscribe('Student');
		self.subscribe('Globals');
	});
	Template.instance().attendancePage = new ReactiveVar(0);
	AttendanceUtilities.attendancePage = 0;
});

Template.profileAttendance.helpers({
	ProfilesTable: function() {
		let Profiles = Student.find({});
		let ProfilesTable = [];

		var numberOfWeeks = Globals.numberOfWeeks();
		//Force reactivity.
		var attendancePage = Template.instance().attendancePage.get();
		Profiles.forEach(function(currentValue, index, profile){
			currentValue.total = 0;
			for(var i = 0; i < numberOfWeeks; i++) {
				currentValue.total += currentValue.attendance[i];
			}
			currentValue.url = "/profile/" + currentValue._id;
			currentValue.attendance = AttendanceUtilities.attendance(currentValue.attendance);
			/*
			for(i in currentValue.attendance){
				if(currentValue.attendance[i] === true){
					currentValue.attendance[i] = "Present";
				}
				if(currentValue.attendance[i] === false){
					currentValue.attendance[i] = "Absent";
				}
			}
			*/
			currentValue.parentNames = currentValue.parentNames.join(" and ");
			ProfilesTable.push(currentValue);
		});
	 	return ProfilesTable;
	},
	studentIndex: function(){
		return studentIndex;
	},
	headers: function() {
		//Force reactivity.
		var attendancePage = Template.instance().attendancePage.get();
		return AttendanceUtilities.headers();
	},
	emptyAttendance: function() {
		//Force reactivity.
		var attendancePage = Template.instance().attendancePage.get();
		return AttendanceUtilities.emptyAttendance();
	}
});

Template.profileAttendance.events({
	"click #leftCaretButton" (event) {
		AttendanceUtilities.decrementPage();
		Template.instance().attendancePage.set(AttendanceUtilities.attendancePage);
	},
	"click #rightCaretButton" (event) {
		AttendanceUtilities.incrementPage();
		Template.instance().attendancePage.set(AttendanceUtilities.attendancePage);
	}
});
