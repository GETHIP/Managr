import { Globals } from '../../collections/globals.js';

export var AttendanceUtilities = {
	attendanceColumnsPerPage: 6,
	attendancePage: 0,
	//The indices are inclusive - exclusive.
	//[startIndex, endIndex)
	startIndex: function() {
		return this.attendancePage * this.attendanceColumnsPerPage;
	},
	endIndex: function() {
		return this.startIndex() + this.attendanceColumnsPerPage;
	},
	incrementPage: function() {
		if (this.attendancePage < Globals.numberOfWeeks() / this.attendanceColumnsPerPage - 1) {
			this.attendancePage++;
		}
	},
	decrementPage: function() {
		if (this.attendancePage > 0) {
			this.attendancePage--;
		}
	}
}

