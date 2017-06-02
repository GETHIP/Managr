// import { Student } from '../../collections/student.js';
// import { Globals } from '../../collections/globals.js';
// import { AttendanceUtilities } from './attendanceUtilities.js';
//
// Template.attendanceWeeksHeader.helpers({
//   shouldBeHidden: function(side) {
//     console.log(AttendanceUtilities.attendancePage);
//   	if (AttendanceUtilities.attendancePage >= (Globals.numberOfWeeks() / AttendanceUtilities.attendanceColumnsPerPage)-1) {
//   		return 'buttonHide';
//   	}
//   	if (AttendanceUtilities.attendancePage == 0) {
//   		if (side == "right") {
//   			return '';
//   		} else {
//   			return 'buttonHide';
//   		}
//   	}
//   	if (Globals.numberOfWeeks() <= AttendanceUtilities.AttendanceColumnsPerPage) {
//   		if (side == "left") {
//   			return '';
//   		} else {
//   			return 'buttonHide';
//   		}
//   	}
//   	return '';
//
//    }
// });
