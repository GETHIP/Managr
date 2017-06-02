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
			if(this.attendancePage >= (Globals.numberOfWeeks() / this.attendanceColumnsPerPage)-1){
				document.getElementById("rightCaretButton").classList.add('buttonHide');
				document.getElementById("leftCaretButton").classList.remove('buttonHide');
		} else{
				document.getElementById("leftCaretButton").classList.remove('buttonHide');
		}
	}
	},
	decrementPage: function() {
		if (this.attendancePage > 0) {
			this.attendancePage--;
			if (this.attendancePage == 0){
				document.getElementById("leftCaretButton").classList.add('buttonHide');
				document.getElementById("rightCaretButton").classList.remove('buttonHide');
			} else{
				document.getElementById("rightCaretButton").classList.remove('buttonHide');
			}
		}
	},
	headers: function() {
		var headers = [];
		var numberOfWeeks = Globals.numberOfWeeks();
		for (var i = this.startIndex(); i < this.endIndex(); i++) {
			if (i < numberOfWeeks) {
				headers.push(i + 1);
			}
		}
		return headers;
	},
	attendance: function(attendanceArray) {
		var attendance = [];
		var endIndex = Math.min(this.endIndex(), Globals.numberOfWeeks());
		for (var i = this.startIndex(); i < endIndex; i++) {
			var attendanceObj = {
				index: i
			}
			if (attendanceArray[i]) {
				attendanceObj.selectedPresent = "selected";
				attendanceObj.selectedAbsent = "";
				attendanceObj.text = "Present";
			} else {
				attendanceObj.selectedPresent = "";
				attendanceObj.selectedAbsent = "selected";
				attendanceObj.text = "Absent";
			}
			attendance.push(attendanceObj);
		}
		return attendance;
	},
	emptyAttendance: function() {
		var maxPage = Globals.numberOfWeeks() / this.attendanceColumnsPerPage;
		var maxWeeks = 0;
		var numberOfWeeks = Globals.numberOfWeeks();
		while (maxWeeks < numberOfWeeks) {
			maxWeeks += this.attendanceColumnsPerPage;
		}
		var extraHeadersLength = maxWeeks % numberOfWeeks;
		//Only the last page has extra headers.
		if (this.attendancePage < maxPage - 1) {
			return [];
		}
		//On the last page, if we don't have enough headers, the total column
		//gets pushed to the left of the total header. Thus, we push empty strings
		//so that <td> tags are rendered, correctly aligning the columns.
	}
}
