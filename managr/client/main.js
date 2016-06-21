import {Template} from 'meteor/templating';

Template.aboutme.onCreated(function() {
	var self = this;
	self.autorun(function() {
		self.subscribe('Student');
	});
});

Template.aboutme.helpers({
	student: function() {
		let userId = FlowRouter.getParam("id");
		let student = Student.findOne({"_id": userId});
    student.github = "https://github.com/" + student.github;
    student.address = student.address.street + " " + student.address.city + " " + student.address.state + " " + student.address.zipCode;
    student.parentNames = student.parentNames[0] + " and " + student.parentNames[1];
    return student;
	},
	strengths: function() {
		let userId = FlowRouter.getParam("id");
		return strengths = Student.findOne({"_id": userId}).strengths;
	}
});

Template.attendanceBody.onCreated(function() {
	var self = this;
	self.autorun(function() {
		self.subscribe('Student');
	});
});

Template.attendanceBody.helpers({
	attendance: function() {
		let userId = FlowRouter.getParam("id");
		let attendance = [];
		attendance = Student.findOne({
			"_id": userId
		}).attendance;
		return attendance;
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
		studentName = Student.findOne({
			"_id": userId
		});
		return studentName;
	}
});

Template.assignmentsBody.onCreated(function() {
	var self = this;
	self.autorun(function() {
		self.subscribe('Student');
	});
});

Template.assignmentsBody.helpers({
	assignments: function() {
		let userId = FlowRouter.getParam("id");
		let assignments = [];
		assignments = Student.findOne({
			"_id": userId
		}).assignments;
		for (var i in assignments) {

            //put the date in the format: Sunday June 4, 2016
			var dateAssigned = assignments[i].dateAssigned;
            var dueDate = assignments[i].dueDate;

            assignments[i].dateAssigned = getDay(dateAssigned.getDay()) + ' ' + getMonth(dateAssigned.getMonth()) + ' ' + dateAssigned.getDate() + ', ' + dateAssigned.getFullYear();
            assignments[i].dueDate = getDay(dueDate.getDay()) + ' ' + getMonth(dueDate.getMonth()) + ' ' + dueDate.getDate() + ', ' + dueDate.getFullYear();

            function getDay(day) {
    			switch (day) {
    				case 0:
    					return 'Sunday';
    					break;
    				case 1:
    					return 'Monday';
    					break;
    				case 2:
    					return 'Tuesday';
    					break;
    				case 3:
    					return 'Wednesday';
    					break;
    				case 4:
    					return 'Thursday';
    					break;
    				case 5:
    					return 'Friday';
    					break;
    				case 6:
    					return 'Saturday';
    					break;
    			}
            }

            function getMonth(month) {
                switch (month) {
					case 0:
						return 'January';
						break;
					case 1:
						return 'February';
						break;
					case 2:
						return 'March';
						break;
					case 3:
						return 'April';
						break;
					case 4:
						return 'May';
						break;
					case 5:
						return 'June';
						break;
					case 6:
						return 'July';
						break;
					case 7:
						return 'August';
						break;
					case 8:
						return 'September';
						break;
					case 9:
						return 'October';
						break;
					case 10:
						return 'November';
						break;
					case 11:
						return 'December';
						break;
				}
			}
		}

		return assignments;
	}
});

Template.Profile.events({
	"click .editAboutMe" (event) {
		window.location = "/profile/edit/" + FlowRouter.getParam("id");
	}, "click .editAttendance" (event) {
		window.location = "/attendance/edit/" + FlowRouter.getParam("id");
	}
});

Template.profileEdit.onCreated(function() {
	var self = this;
	self.autorun(function() {
		self.subscribe('Student');
	});
});

Template.profileEdit.events({
	"submit .profileEdit" (event) {
		event.preventDefault();
		let userId = FlowRouter.getParam("id");
		const email = event.target.email.value;
		const age = event.target.age.value;
		const school = event.target.school.value;
		const getHipYear = event.target.getHipYear.value;
		var data = {
			email: email,
			age: age,
			school: school,
			getHipYear: getHipYear
		}
		Student.update({_id: userId},{$set: data});
		window.location = "/profile/" + FlowRouter.getParam("id");
	}
});

Template.profileEdit.helpers({
	data: function() {
		let userId = FlowRouter.getParam("id");
		let data = Student.findOne({
			"_id": userId
		});
		return data;
	}
});

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
			if (weeks === "True" || weeks === true) {
				data.push(true);
			}
			if (weeks === "False" || weeks === false) {
				data.push(false);
			}
		}
		console.log(data);
		Student.update({_id: userId},{$set: {attendance: data}});
		window.location = "/profile/" + FlowRouter.getParam("id");
	}
});
var wordNumbers = ["zero", "one", "two", "three", "four", "five", "six",
	"seven", "eight", "nine", "ten", "eleven", "twelve"
]
Template.attendanceUpdate.helpers({
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
		console.log(attendance);
		return attendance;
	}
});

Template.navbar.helpers({
		assignments: function(){
				let userId = FlowRouter.getParam("id");
				return assignments = "/assignments/" + userId;
		},
		profile: function(){
			let userId = FlowRouter.getParam("id");
			return assignments = "/profile/" + userId;
		}
});
