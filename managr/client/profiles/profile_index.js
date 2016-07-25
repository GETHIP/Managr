import { Student } from '../../collections/student.js';

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
  },
  ep: function() {
    let userId = FlowRouter.getParam("id");
    return ep = Student.findOne({"_id": userId}).ep10;
  }
});

Template.aboutme.events({
	'click .blogButton'(event){
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
  });
});

Template.attendanceBody.helpers({
  attendance: function() {
    let userId = FlowRouter.getParam("id");
    let attendance = [];
    let rawAttendance = Student.findOne({"_id": userId}).attendance;
    for(i in rawAttendance){
      if(rawAttendance[i] === true){
        attendance.push("Present");
      }
      if(rawAttendance[i] === false){
        attendance.push("Absent");
      }
    }
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
    studentName = Student.findOne({"_id": userId});
    return studentName;
  }
});

// Template.assignmentsBody.onCreated(function() {
//   var self = this;
//   self.autorun(function() {
//     self.subscribe('Student');
//   });
// });

// Template.assignmentsBody.helpers({
//   assignments: function() {
//     let userId = FlowRouter.getParam("id");
//     let assignments = [];
//     assignments = Student.findOne({
//       "_id": userId
//     }).assignments;
//     for (var i in assignments) {

//       //put the date in the format: Sunday June 4, 2016
//       var dateAssigned = assignments[i].dateAssigned;
//       var dueDate = assignments[i].dueDate;

//       assignments[i].dateAssigned = getDay(dateAssigned.getDay()) + ' ' + getMonth(dateAssigned.getMonth()) + ' ' + dateAssigned.getDate() + ', ' + dateAssigned.getFullYear();
//       assignments[i].dueDate = getDay(dueDate.getDay()) + ' ' + getMonth(dueDate.getMonth()) + ' ' + dueDate.getDate() + ', ' + dueDate.getFullYear();

//       function getDay(day) {
//         switch (day) {
//           case 0:
//           return 'Sunday';
//           break;
//           case 1:
//           return 'Monday';
//           break;
//           case 2:
//           return 'Tuesday';
//           break;
//           case 3:
//           return 'Wednesday';
//           break;
//           case 4:
//           return 'Thursday';
//           break;
//           case 5:
//           return 'Friday';
//           break;
//           case 6:
//           return 'Saturday';
//           break;
//         }
//       }

//       function getMonth(month) {
//         switch (month) {
//           case 0:
//           return 'January';
//           break;
//           case 1:
//           return 'February';
//           break;
//           case 2:
//           return 'March';
//           break;
//           case 3:
//           return 'April';
//           break;
//           case 4:
//           return 'May';
//           break;
//           case 5:
//           return 'June';
//           break;
//           case 6:
//           return 'July';
//           break;
//           case 7:
//           return 'August';
//           break;
//           case 8:
//           return 'September';
//           break;
//           case 9:
//           return 'October';
//           break;
//           case 10:
//           return 'November';
//           break;
//           case 11:
//           return 'December';
//           break;
//         }
//       }
//     }
//     return assignments;
//   }
// });

Template.aboutme.events({

});
