﻿// Import meteor for server / publish and Assignments to publish
import { Meteor } from 'meteor/meteor';
import { Posts } from '../collections/blogPosts.js';
import { Comments } from '../collections/comments.js';
import { Assignments } from '../collections/assignments.js';
import { Instructor } from '../collections/instructor.js';
import { Student } from '../collections/student.js';
import { Drafts } from '../collections/drafts.js';

var fs = Npm.require('fs');

function userIsValid() {
	var isValid = true;
    if(Meteor.user() == null){
      isValid = false;
    }
    else if(Roles.userIsInRole(Meteor.user()._id, 'unconfirmed')){
      isValid = false;
    }
	return isValid;
}

function createDefaultUser() {
	var users = Meteor.users.find({username: "admin"}).fetch();
	if (users.length > 0) {
		return;
	}

	var adminId = Accounts.createUser({
		username: "admin",
		password: "Gallup2016"
	});
	Roles.addUsersToRoles(adminId, ['instructor']);
	Instructor.insert({
		"name": "Admin",
		"picture": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMDAsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wAARCAEsASwDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD6oooor9gPhAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKxtd8ZaJ4aBGpanb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",
		"strengths": ['Arranger', 'Woo', 'Communication', 'Maximizer', 'Activator'],
		"description": "Admin",
		"email": "x",
		"userId": adminId
	});
}

Meteor.startup(() => {
	// code to run on server at startup
	createDefaultUser();
  studentIndex = new EasySearch.Index({
		name: "studentIndex",
		collection: Student,
    fields: ['name'],
    engine: new EasySearch.Minimongo({
			transform: function (doc){
				doc.url = "/profile/" + doc._id;
				doc.attendanceNumber = 0;
				for(i in doc.attendance){
						if(doc.attendance[i] === true){
								attendanceNumber++;
								doc.attendance[i] = "Present";
								doc.attendanceNumber++;
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
  Meteor.publish("Comments", function(){
    return Comments.find();
  });
  Meteor.publish("Posts", function(){
		var isValid = true;
    if(!this.userId){
      isValid = false;
    }
    else if(Roles.userIsInRole(this.userId, 'unconfirmed')){
      isValid = false;
    }
		if(isValid){
    	return Posts.find();
		}
		else{
			return Posts.find({isPublic: true});
		}
  });

	Meteor.publish("Drafts", function(){
		return Drafts.find();
	});

  Posts.allow({
    'insert': function(userId, doc) {
      true;
    },
    'update': function(userId, doc){
      true;
	},
    'remove': function(userId, doc){
      true;
  }
  });

	Drafts.allow({
		'insert': function(userId, doc) {
			true;
		},
		'update': function(userId, doc){
			true;
		},
		'remove': function(userId, doc){
			true;
	}
	});

  Meteor.methods({
	'delDraft' : function(id){
		Drafts.remove({"_id" : id});
	},
	'createDraft': function(draft){
		Drafts.insert(draft);
	},
	'editDraft': function(draft, id){
		Drafts.update({"_id": id}, {
			$set: {
				title: draft.title,
				text: draft.text,
				lastUpdated: draft.lastUpdated,
				isPublic: draft.isPublic
			}
		});
	},
	'updatePost': function(postId, text, title, vis){
		Posts.update({_id: postId}, {
			$set: {
				text: text,
				isPublic: vis,
				title: title,
				lastUpdated: new Date()
			}
		});
	},
	'deleteComment': function(id, index){
		var comments = Posts.findOne({"_id": id}).comments;
		var correctId = comments[index].authorId;
		if(correctId == Meteor.userId() || Roles.userIsInRole(Meteor.user()._id, "instructor")){
			comments.splice(index, 1);
			Posts.update({"_id": id}, {$set : {comments : comments}});
		}
	},
    'delPost': function(id){
      correctId = Posts.findOne({"_id": id}).authorId;
      if(correctId == Meteor.userId()){
        Posts.remove({"_id": id});
      }
    },
    'insertPost':function(post) {
		post.lastUpdated = new Date();
		Posts.insert(post);
    },
    'updateComment': function(authorName, postId, authorId, commentText){
		if(!userIsValid()){
			return;
		}
		 Posts.update({_id: postId },
        {
          $push: { comments:
            {
              text: commentText,
              authorId: authorId,
              date: new Date(),
              authorName: authorName
            }
          }
        });
    },
	'testCreatePosts': function() {
		var jimId = Meteor.users.findOne({username: "jim"})._id;
		var jimName = "Jim";
		var instructorId = Meteor.users.findOne({username: "instructor"})._id;
		var jimName = Instructor.findOne({userId: jimId}).name;
		var instructorName = "Zach";

		var i = 0;
		var dates = [
			new Date(2016, 1, 1),
			new Date(2016, 2, 1),
			new Date(2016, 3, 1),
			new Date(2015, 1, 1),
			new Date(2015, 2, 1),
			new Date(2015, 3, 1),
			new Date(2014, 1, 1),
			new Date(2014, 2, 1),
			new Date(2014, 3, 1),
			new Date(2013, 1, 1)
		];
		for (i = 1; i <= 10; i++) {
			var id = jimId;
			var name = jimName;
			var otherId = instructorId;
			var otherName = instructorName;
			var isPublic = true;
			if (i % 2 == 0) {
				id = instructorId;
				name = instructorName;
				otherId = jimId;
				otherName = jimName;
				isPublic = false;
			}
			Posts.insert({
				title: "Title " + i,
				text: "Text of the blog post.\n\n\n\nEnd of blog post.",
				authorId: id,
				authorName: name,
				date: dates[i - 1],
				lastUpdated: dates[i - 1],
				isPublic: isPublic,
				comments: [
					{
						text: "Comment.",
						authorId: otherId,
						authorName: otherName,
						date: dates[i - 1]
					},
          {
            text: "Comment.",
						authorId: jimId,
						authorName: jimName,
            date: dates[i - 1]
          },
          {
            text: "Comment.",
						authorId: otherId,
						authorName: otherName,
            date: dates[i - 1]
          }
				]
			});
		}

    },
	'testCreateUsers': function() {
		var instructorId = Accounts.createUser({
			username: "instructor",
			password: "password",
		});
		var jimId = Accounts.createUser({
			username: "jim",
			password: "password",
		});
		var studentId = Accounts.createUser({
			username: "student",
			password: "password",
		});

		Roles.addUsersToRoles(instructorId, 'instructor');
		Roles.addUsersToRoles(jimId, 'instructor');
		Roles.addUsersToRoles(studentId, 'student');

		Instructor.insert({
			"name": "Jim Collison",
			"picture": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMDAsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wAARCAEsASwDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD6oooor9gPhAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKxtd8ZaJ4aBGpanb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",
			"strengths": ['Arranger', 'Woo', 'Communication', 'Maximizer', 'Activator'],
			"description": "Teacher",
			"email": "Teacher@teacher.com",
			"userId": jimId,
			"drafts": []
		});
		Instructor.insert({
			"name": "Zach",
			"picture": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMDAsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wAARCAEsASwDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD6oooor9gPhAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKxtd8ZaJ4aBGpanb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",
			"strengths": ['Arranger', 'Woo', 'Communication', 'Maximizer', 'Activator'],
			"description": "Teacher",
			"email": "Teacher@teacher.com",
			"userId": instructorId,
			"drafts": []
		});
		Student.insert({
			"name": "Jim Smallison",
			"age": 16,
			"userId": studentId,
			"strengths": ['Input', 'Command', 'Restorative', 'Learner', 'Futuristic'],
			"description": "Programmer",
			"grade": '10',
			"attendance": [true, false, true, true, false, false, true, true, false,
				true, true, false
			],
			"school": "Mount Michael",
			"email": "dash_wedergren@gallup.com",
			"getHipYear": 2,
			"phoneNumber": '4026571179',
			"parentNames": ['Bill', 'Hillary'],
			"address": {
				"street": '3910 s 226th st.',
				"city": 'Elkhorn',
				"state": 'Nebraska',
				"zipCode": 68022
			},
			"github": 'Athletesrun',
			"blog": "http://blogger.com",
			"tshirtSize": "Small",
      "ep10": ["Responsibility", "Profitability", "Communication", "Strategic"],
      "picture": 'data:image/png;base64,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'
		});
	},
	'createDefaultUser': function() {
		createDefaultUser();
	},
	'addStudent': function(data){
		 data.id = Accounts.createUser({
				username: data[3],
				password: "G3tH1pPr0gram"
		 });
		 Roles.addUsersToRoles(data.id, 'Student');
		 Student.insert({
		 		 		"name": data[0],
		 		 		"userId": data.id,
		 		 		"school": data[1],
		 		 		"age": data[2],
		 		 		"email": data[3],
		 		 		"parentNames": data[4],
		 		 		"description": data[5],
		 		 		"grade": data[6],
		 		 		"getHipYear": data[7],
		 		 		"phoneNumber": data[8],
		 		 		"blog": data[9],
		 		 		"strengths": [undefined],
		 		 		"attendance": [false, false, false, false, false, false, false, false, false, false, false, false],
		 		 		"github": "blank",
		 		 		"tshirtSize": "blank",
		 		 		"blog": "blank",
		 		 		"ep10": [undefined],
		 		 		"picture": "blank",
		 		 		"address": {
		 		 				"street": data[10],
		 		 				"zipCode": 68055,
		 		 				"state": "blank",
		 		 				"city": "blank"
		 		 		}
		 });
	 },
	 'removeAssignment':function(assignmentId) {
		 var allStudents = Student.find({}).fetch();
		 allStudents.forEach(function(student) {
				 var assignments = student.assignments;
				 for(var i = 0; i < assignments.length; i++) {
						 if(assignments[i].assignmentId == assignmentId) {
								 assignments.splice(i, 1);
								 Student.update({_id: student._id},
								 {
										 $set: {assignments: assignments}
								 });
								 break;
						 }
				 }
		 });
		 Assignments.remove(assignmentId);
	 },
	 'submitAssignment':function(assignmentId) {
		 var student = Student.findOne({userId: Meteor.user()._id});
		 var studentAssignments = student.assignments;
		 for(var i = 0; i < studentAssignments.length; i++) {
				 if(studentAssignments[i].assignmentId == assignmentId) {
						 studentAssignments[i].completed = true;
						 var successful = Student.update({userId: Meteor.user()._id},
						 {
								 $set: {assignments: studentAssignments}
						 });
						 break;
				 }
		 }
	 },
	 'createAssignment':function(title, description, dueDate, pointsPossible) {
		 var assignmentId = Assignments.insert({
       title: title,
       description: description,
       dueDate: dueDate,
       assigner: Instructor.findOne({userId: Meteor.user()._id}).name,
       dateAssigned: new Date(),
       pointsPossible: pointsPossible
     });
		 Meteor.call("addEmptyAssignmentToAllStudents", assignmentId);
	 },
	 'addEmptyAssignmentToAllStudents':function(assignmentId) {
		 //A default template for a grade that has no score but must get added to the students
     var emptyAssignment = {
        assignmentId: assignmentId,
        pointsReceived: -1,
        completed: false
     };

     var allStudents = Student.find({}).fetch();
     if(allStudents.length > 0) {
       for(var i = 0; i < allStudents.length; i++) {
         var assignments = allStudents[i].assignments;
         if(assignments == undefined) {
           assignments = [];
         }
         assignments.push(emptyAssignment);
         Student.update({_id: allStudents[i]._id},
         {
           $set: {assignments: assignments}
         });
       }
     }
	 },
	 'updateAssignment':function(assignmentId, title, description, dueDate, pointsPossible) {
		 var assignment = Assignments.findOne({_id: assignmentId});
		 var assigner = Instructor.findOne({userId: Meteor.user()._id}).name;

     Assignments.update({
       _id:assignment._id
     },
     {
       $set: {
         title: title,
         description: description,
         dueDate: dueDate,
         assigner: assigner,
         dateAssigned: new Date(),
         pointsPossible: pointsPossible
       }
     });
	 }
  });
    Meteor.publish('Assignments', function() {
        return Assignments.find();
    });

    UploadServer.init({
        tmpDir: process.env.PWD + '/.uploads/tmp',
        uploadDir: process.env.PWD + '/.uploads/'
    })

	Meteor.publish("Student", function() {
		return Student.find();
	});
	Meteor.publish("Instructor", function() {
		return Instructor.find();
	});

	//control update better
	Student.allow({
		update: function(userId, doc) {
			return true;
		}
	});


});
