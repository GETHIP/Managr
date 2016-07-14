import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Comments } from '../collections/comments.js'
import { Posts } from '../collections/blogPosts.js'
import { Assignments } from "../collections/assignments.js";
import { Student } from "../collections/student.js";

PostsIndex = new EasySearch.Index({
	collection: Posts,
	fields: ['title', 'text', 'comments', 'authorName'],
	defaultSearchOptions: {
		sortBy: 'date'
	},
	engine: new EasySearch.Minimongo({
	  transform: function(doc){
		var newPosts = {};
		var newDate;
		newDate = moment(doc.date);
		var formattedDate = moment(newDate).format("M/D/YY");
		newPosts = {
			_id: doc._id,
			date: formattedDate,
			title: doc.title,
			text: doc.text,
			authorId: doc.authorId,
			authorName: doc.authorName,
      isPublic: doc.isPublic,
			comments: doc.comments
		};
		return newPosts;
	  },
	  sort: function (searchObject, options) {
		  return {
			date: -1
		  };
	  }
	})
});

Template.assignmentBackButton.events({
    'click #backToAssignments'(event){
        window.location = "/assignments";
    }
});

function csvDownload(array, name){
  let csv = Papa.unparse(array);
  csv = new Blob([csv], { type: 'text/csv' } );
  console.log(csv);
  saveAs(csv, name + ".csv");
}
studentIndex = new EasySearch.Index({
  name: "studentIndex",
  collection: Student,
  fields: ['name'],
  engine: new EasySearch.Minimongo({
    transform: function (doc){
      doc.url = "/profile/" + doc._id;
      doc.total = 0;
      for(i=0;i<12;i++){
        doc.total += doc.attendance[i];
      }
      for(i in doc.attendance){
        if(doc.attendance[i] == true){
          doc.attendance[i] = "green";
        }
        if(doc.attendance[i] == false){
          doc.attendance[i] = "red";
        }
      }
      doc.parentNames = doc.parentNames.join(" and ");
      return doc;
    }
  }),
  permission: function(){
    return true;
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
			window.location = blogURL;
	}
});


Template.main.helpers({
  renderNavbar:function() {
    return (FlowRouter.current().path == "/login") || (Meteor.user() != null);
  },
  navbarDivMargins: function() {
    if ((FlowRouter.current().path == "/login") || (Meteor.user() != null)){
      return "userLoggedIn";
    }
    else{
      return "";
    }
  }
})

Template.blogLayout.helpers({
  renderNavbar:function() {
    return (FlowRouter.current().path == "/login") || (Meteor.user() != null);
  },
  navbarDivMargins: function() {
    if ((FlowRouter.current().path == "/login") || (Meteor.user() != null)){
      return "userLoggedIn";
    }
    else{
      return "";
    }
  }
})

/*
Template.navbar.helpers({
  assignments: function(){
    let userId = FlowRouter.getParam("id");
    if (userId == null || userId == undefined || userId == "") {
      return assignments = "/assignments/";
    }
    else {
      return assignments = "/assignments/" + userId;
    }
  },
  profile: function(){
    let userId = FlowRouter.getParam("id");
    if (userId == null || userId == undefined || userId == "") {
      return assignments = "/profiles/";
    }
    else {
      return assignments = "/profiles/" + userId;
    }
  }
});
*/

// Gives user window scope over the Assignments collection
window.Assignments = Assignments;


/*
Template.comment.onCreated(function(){
Meteor.subscribe('Comments');
});
*/

UI.registerHelper("isStudent", function() {
  if(Meteor.user() == null) {
    return false;
  }
  return Roles.userIsInRole(Meteor.user()._id, "student");
});
UI.registerHelper("isInstructor", function() {
  if(Meteor.user() == null) {
    return false;
  }
  return Roles.userIsInRole(Meteor.user()._id, "instructor");
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
})
