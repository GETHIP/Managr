import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Comments } from '../collections/comments.js'
import { Assignments } from "../collections/assignments.js";

Template.post.onCreated(function(){
  Meteor.subscribe('Posts');
});
Template.writeComment.onCreated(function(){
  Meteor.subscribe('Posts');
});
Template.studentSingle.onCreated(function() {
  Meteor.subscribe("Assignments");
});
Template.editAssignment.onCreated(function () {
  Meteor.subscribe("Assignments");
});
Template.studentTable.onCreated(function () {
  Meteor.subscribe("Assignments");
});
Template.allStudent.onCreated(function () {
  Meteor.subscribe("Assignments");
});
Template.newAssignment.onCreated(function () {
  Meteor.subscribe("Assignments");
});

// Provides the assignment data to the single template from Assignments collection
Template.studentSingle.helpers({
    assignments: function() {
        var objects;
        objects = Assignments.find({
            "_id": new Meteor.Collection.ObjectID(FlowRouter.getParam("id"))
        }).fetch();
        if (objects.length > 0) {
            var obj, cleanedObj;
            obj = objects[0];
            // The formatted object to be returned
            cleanedObj = {
                title: obj.title,
                description: obj.description,
                dueDate: (obj.dueDate.getMonth() + 1) + "/" + obj.dueDate.getDate() + "/" +  obj.dueDate.getFullYear(),
                assigner: obj.assigner,
                dateAssigned: (obj.dueDate.getMonth() + 1) + "/" + obj.dueDate.getDate() + "/" +  obj.dueDate.getFullYear(),
                pointsPossible: obj.pointsPossible
            }
            return cleanedObj;
        }
        else {
            return {};
        }
    }
});

// Provides the editSingle template with information on a single assignment
Template.editAssignment.helpers({
    assignments: function() {
        var objects;
        objects = Assignments.find({
            "_id":new Meteor.Collection.ObjectID(FlowRouter.getParam("id"))
        }).fetch();
        if (objects.length > 0) {
            var obj, cleanedObj, i;
            obj = objects[0];
            // The formatted object to be returned
            cleanedObj = {
                title: obj.title,
                description: obj.description,
                dueDate: (obj.dueDate.getMonth() + 1) + "/" + obj.dueDate.getDate() + "/" +  obj.dueDate.getFullYear(),
                assigner: obj.assigner,
                dateAssigned: (obj.dueDate.getMonth() + 1) + "/" + obj.dueDate.getDate() + "/" +  obj.dueDate.getFullYear(),
                pointsPossible: obj.pointsPossible
            }
            return cleanedObj;
        }
        else {
            return {};
        }
    }
});

// Provides the table template with all the listed assignments
Template.studentTable.helpers({
    assignments: function() {
        var list, objects, i;
        list = [];
        objects = Assignments.find({}).fetch();
        for (i = 0; i < objects.length; i++) {
            if (objects.length > 0) {
                var obj, j, aUrl, cleanedObj;
                obj = objects[i];
                aUrl = "./single/" + obj._id.valueOf();
                // The formatted object to be returned
                cleanedObj = {
                    title: obj.title,
                    description: obj.description,
                    dueDate: (obj.dueDate.getMonth() + 1) + "/" + obj.dueDate.getDate() + "/" +  obj.dueDate.getFullYear(),
                    assigner: obj.assigner,
                    dateAssigned: (obj.dueDate.getMonth() + 1) + "/" + obj.dueDate.getDate() + "/" +  obj.dueDate.getFullYear(),
                    pointsPossible: obj.pointsPossible,
                    url: aUrl
                }
                list.push(cleanedObj);
            }
        }
        return list;
    }
});

// Provides listing template with a list of assignments
Template.allStudent.helpers({
    assignments: function() {
        var list, objects, i;
        list = [];
        objects = Assignments.find({}).fetch();
        for (i = 0; i < objects.length; i++) {
            if (objects.length > 0) {
                var obj, j, cleanedObj;
                obj = objects[i];
                // The formatted object to be returned
                cleanedObj = {
                    title: obj.title,
                    description: obj.description,
                    dueDate: (obj.dueDate.getMonth() + 1) + "/" + obj.dueDate.getDate() + "/" +  obj.dueDate.getFullYear(),
                    assigner: obj.assigner,
                    dateAssigned: (obj.dueDate.getMonth() + 1) + "/" + obj.dueDate.getDate() + "/" +  obj.dueDate.getFullYear(),
                    pointsPossible: obj.pointsPossible
                }
                list.push(cleanedObj);
            }
        }
        return list;
    }
});
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
			console.log(blogURL);
			window.location = blogURL;
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
		let rawAttendance = Student.findOne({
			"_id": userId
		}).attendance;
		for(i in rawAttendance){
				if(rawAttendance[i] === true){
						attendance.push("True");
				}
				if(rawAttendance[i] === false){
						attendance.push("False");
				}
		}
		return attendance;
	}
});

Template.ProfilesTable.onCreated(function() {
	var self = this;
	self.autorun(function() {
		self.subscribe('Student');
	})
})

Template.ProfilesTable.helpers({
	ProfilesTable: function() {
		console.log(Student.find({}))
	 	return Student.find({});
	}
})

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

		console.log(studentName);
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
		const grade = event.target.grade.value;
		const github = event.target.github.value;
		const name = event.target.name.value;
		const description = event.target.description.value;
		const phoneNumber = event.target.phoneNumber.value;
		const tshirtSize = event.target.tshirtSize.value;
		const blog = event.target.blog.value;
		const street = event.target.street.value;
		const city = event.target.city.value;
		const state = event.target.state.value;
		const zipCode = event.target.zipCode.value;
		const strength1 = event.target.strength1.value;
		const strength2	= event.target.strength2.value;
		const strength3 = event.target.strength3.value;
		const strength4 = event.target.strength4.value;
		const strength5 = event.target.strength5.value;
		const ep1 = event.target.ep1.value;
		const ep2 = event.target.ep2.value;
		const ep3 = event.target.ep3.value;
		const ep4 = event.target.ep4.value;

		var data = {
			email: email,
			age: age,
			school: school,
			getHipYear: getHipYear,
			grade: grade,
			github: github,
			name: name,
			description: description,
			phoneNumber: phoneNumber,
			tshirtSize: tshirtSize,
			blog: blog,
			address: {
				street: street,
				city: city,
				state: state,
				zipCode: zipCode
			},
			strengths: [strength1, strength2, strength3, strength4, strength5],
			ep10: [ep1, ep2, ep3, ep4]
		};

		Student.update({_id: userId},{$set: data});
		window.location = "/profile/" + FlowRouter.getParam("id");
	}
});

Template.profileEdit.helpers({
	data: function() {
		let userId = FlowRouter.getParam("id");
		let data = Student.findOne({"_id": userId});
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
                if (userId == undefined) {
                    return "/assignments/";
                }
                else {
	                return "/assignments/" + userId;
                }
		},
		profile: function(){
			let userId = FlowRouter.getParam("id");
            if (userId == undefined) {
                return "/profiles/";
            }
            else {
                return "/profiles/" + userId;
            }
		}
});

Template.editAssignment.events({
  'submit .submitbtn2'(event) {
    event.preventDefault();
    const form = event.target;
    Assignments.update({
      _id:new Meteor.Collection.ObjectID(FlowRouter.getParam("id"))
    },
    {
      $set: {
        title: form.name.value,
        description: form.description.value,
        dueDate: form.dateDue.value,
        assigner: "Zach Merrill",
        dateAssigned: new Date(),
        pointsPossible: form.points.value
      }
    });
  }
});

Template.newAssignment.events({
  'submit .submitbtn'(event){
    event.preventDefault();
    const form = event.target;
    Assignments.insert({
      title: form.name.value,
      description: form.description.value,
      dueDate: form.dateDue.value,
      assigner: "Zach Merrill",
      dateAssigned: new Date(),
      pointsPossible: form.points.value
    });
  }
});

// Gives user window scope over the Assignments collection
window.Assignments = Assignments;
