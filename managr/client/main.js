import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Comments } from '../collections/comments.js'
import { Assignments } from "../collections/assignments.js";

studentIndex = new EasySearch.Index({
	name: "studentIndex",
	collection: Student,
	fields: ['name'],
	engine: new EasySearch.Minimongo({
		transform: function (doc){
			doc.url = "/profile/" + doc._id;
			for(i in doc.attendance){
					if(doc.attendance[i] === true){
							doc.attendance[i] = "Present";
					}
					if(doc.attendance[i] === false){
							doc.attendance[i] = "Absent";
					}
			}
			doc.attendance = doc.attendance.join(" | ");
			doc.parentNames = doc.parentNames.join(" and ");
			return doc;
		}
	}),
	permission: function(){
		return true;
	}
});

function csvDownload(array, name){
		console.log(array);
		let csv = Papa.unparse(array);
		console.log(csv);
		csv = new Blob([csv], { type: 'text/csv' } );
		console.log(csv);
		saveAs(csv, name + ".csv");
}

Template.post.onCreated(function(){
  Meteor.subscribe('Posts');
});
Template.writeComment.onCreated(function(){
  Meteor.subscribe('Posts');
});
Template.editSingleAssignment.onCreated(function() {
  Meteor.subscribe('Assignments');
});
Template.newAssignment.onCreated(function() {
  Meteor.subscribe('Assignments');
});
Template.singleAssignment.onCreated(function() {
  Meteor.subscribe('Assignments');
});
Template.studentsAllAssignments.onCreated(function() {
  Meteor.subscribe('Assignments');
});
// Provides the assignment data to the single template from Assignments collection
Template.singleAssignment.helpers({
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
Template.editSingleAssignment.helpers({
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
Template.studentsAllAssignments.helpers({
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
Template.newAssignment.helpers({
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
		let Profiles = Student.find({});
		let ProfilesTable = [];
		Profiles.forEach(function(currentValue, index, profile){
			currentValue.url = "/profile/" + currentValue._id;
			for(i in currentValue.attendance){
					if(currentValue.attendance[i] === true){
							currentValue.attendance[i] = "Present";
					}
					if(currentValue.attendance[i] === false){
							currentValue.attendance[i] = "Absent";
					}
			}
			currentValue.attendance = currentValue.attendance.join(" | ");
			currentValue.parentNames = currentValue.parentNames.join(" and ");
			ProfilesTable.push(currentValue);
		});
	 	return ProfilesTable;
	},
	studentIndex: function(){
		return studentIndex;
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
		const parentNames1 = event.target.parentNames1.value;
		const parentNames2 = event.target.parentNames2.value;
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
			ep10: [ep1, ep2, ep3, ep4],
			parentNames: [parentNames1, parentNames2]
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
	"seven", "eight", "nine", "ten", "eleven", "twelve"];

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

Template.reports.events({
		'change #reportsSelect' (event){
				switch (event.target.value) {
					case "T-Shirt Size Report":
							Session.set("reports", "tShirtSizeReport");
					break;
					case "Email Report":
							Session.set("reports", "emailReport");
					break;
					case "Select a report":
							Session.set("reports", "blank");
					break;
					case "Name Report":
							Session.set("reports", "nameReport");
					break;
					case "Age Report":
							Session.set("reports", "ageReport");
					break;
					case "School Report":
							Session.set("reports", "schoolReport");
					break;
					case "Address Report":
							Session.set("reports", "addressReport");
					break;
					case "All":
							Session.set("reports","allReport");
					break;
				}
		},
		'change #namesIncluded' (event){
				Session.set("checked", event.target.checked);
		},
		'click #csvExport' (event){
			let students = Student.find({});
			let array = {};
			array.data = [];
			array.fields = ["Name"];
			let checked = Session.get("checked");
			switch (Session.get("reports")) {
				case "tShirtSizeReport":
						students.forEach(function(currentValue, index){
									array.data.push([currentValue.name, currentValue.tshirtSize]);
						});
				array.fields.push("T-Shirt Size");
				csvDownload(array, "T-Shirt Report");
				break;
				case "emailReport":
						students.forEach(function(currentValue, index){
									array.data.push([currentValue.name, currentValue.email]);
						});
				array.fields.push("Email");
				csvDownload(array, "Email Report");
				break;
				case "nameReport":
						students.forEach(function(currentValue, index){
									array.data.push([currentValue.name]);
						});
				array.fields = ["Name"];
				csvDownload(array, "Name Report");
				break;
				case "ageReport":
						students.forEach(function(currentValue, index){
									array.data.push([currentValue.name, currentValue.age]);
						});
				array.fields.push("Age");
				csvDownload(array, "Age Report");
				break;
				case "schoolReport":
						students.forEach(function(currentValue, index){
									array.data.push([currentValue.name, currentValue.school]);
						});
				array.fields.push("School");
				csvDownload(array, "School Report");
				break;
				case "addressReport":
						students.forEach(function(currentValue, index){
									array.data.push([currentValue.name, currentValue.address.street + " " + currentValue.address.city + " " + currentValue.address.state + " " + currentValue.address.zipCode]);
						});
				array.fields.push("Address");
				csvDownload(array, "Address Report");
				break;
				case "allReport":
						students.forEach(function(currentValue, index){
									array.data.push([currentValue.name, currentValue.school, currentValue.age, currentValue.email, currentValue.parentNames[0] + " and " + currentValue.parentNames[1],currentValue.description, currentValue.grade, currentValue.getHipYear, currentValue.phoneNumber, currentValue.blog, currentValue.address.street + " " + currentValue.address.city + " " + currentValue.address.state + " " + currentValue.address.zipCode]);
						});
				array.fields = ["Name", "School", "Age", "Email", "Parent Names", "Description", "Grade", "Get Hip Year", "Phone Number", "Phone Number", "Address"];
				csvDownload(array, "All Report");
				break;
		}
	}
});

Template.reports.helpers({
		reports: function(){
				let students = Student.find({});
				let array = [];
				let checked = Session.get("checked");
				switch (Session.get("reports")) {
					case "tShirtSizeReport":
							students.forEach(function(currentValue, index){
										array.push(currentValue.name + ": " + currentValue.tshirtSize);
							});
							return array.join(", ");
					break;
					case "emailReport":
							students.forEach(function(currentValue, index){
										array.push(currentValue.name + ": " + currentValue.email);
							});
							return array.join(", ");
					break;
					case "nameReport":
							students.forEach(function(currentValue, index){
									array.push(currentValue.name);
							});
							return array.join(", ");
					break;
					case "ageReport":
							students.forEach(function(currentValue, index){
									array.push(currentValue.name + ": " + currentValue.age);
							});
							return array.join(", ");
					case "schoolReport":
							students.forEach(function(currentValue, index){
									array.push(currentValue.name + ": " + currentValue.school);
							});
							return array.join(", ");
					case "addressReport":
							students.forEach(function(currentValue, index){
									array.push(currentValue.name + ": " + currentValue.address.street + " " + currentValue.address.city + " " + currentValue.address.state + " " + currentValue.address.zipCode);
							});
							return array.join(", ");
					case "blank":
							return "";
					break;
				}
		}
});

Template.editSingleAssignment.events({
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
