// Import meteor for server / publish and Assignments to publish
import { Meteor } from 'meteor/meteor';
import { Posts } from '../collections/blogPosts.js';
import { Comments } from '../collections/comments.js';
import { Assignments } from '../collections/assignments.js';
import { Instructor } from '../collections/instructor.js';

function createDefaultUser() {
	var users = Meteor.users.find({username: "admin"}).fetch();
	if (users.length > 0) {
		return;
	}

	var adminId = Accounts.createUser({
		username: "admin",
		password: "Gallup2016",
	});
	Roles.addUsersToRoles(adminId, ['instructor']);
	Instructor.insert({
		name: "admin",
		profilePicture: "none",
		strengths: ["Achiever", "Activator", "Analytical", "Arranger", "Competition"],
		description: "Admin. I validate other users.",
		email: "none",
		userId: adminId
	});
}

// Publishes Assignments collection so templates can subscribe to recieve collection data
Meteor.startup(() => {
  // code to run on server at startup
	const path = Meteor.settings.uploadDirectoryPath;

	UploadServer.init({
			tmpDir: (process.env.PWD || process.cwd()) + path + 'tmp/',
			uploadDir: (process.env.PWD || process.cwd()) + path,
			checkCreateDirectories: true,
			finished: function(fileInfo, formFields) {
					console.log(fileInfo);
					console.log(formFields);

					var fs = Npm.require('fs');

					var fileTypes = ['image/gif', 'image/jpg', 'image/jpeg', 'image/png', 'image/svg+xml'];
					var fileExtensions= ['.gif', '.jpg', '.jpeg', '.png', '.svg'];

					var extension;

					for(var i in fileTypes) {
							if(fileInfo.type === fileTypes[i]) {
									extension = fileExtensions[i];
									console.log(fileExtensions[i]);
							}
					}

					Student.update({_id: formFields.id}, {$set: {picture: formFields.id + extension}});

					fs.rename((process.env.PWD || process.cwd()) + path + fileInfo.name,
							(process.env.PWD || process.cwd()) + path + formFields.id + extension,
							function(stuff) {
									console.log((process.env.PWD || process.cwd()) + path + fileInfo.name);
									console.log((process.env.PWD || process.cwd()) + path + formFields.id + extension);
									console.log('trying to rename file');
									console.log(stuff);
							});
			},
			acceptFileTypes: /(\.|\/)(gif|jpe?g|png|svg)$/i
	});

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
			console.log(doc.attendance);
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
    return Posts.find();
  });
  Posts.allow({
    'insert': function(userId, doc) {
      true;
    },
    'update': function(userId, doc){
      true;
	}
  });

  Meteor.methods({
    'insertPost':function(post) {
      Posts.insert(post);
      console.log(Posts.find().fetch());
    },
    'updateComment': function(postId, authorId, commentText){
     Posts.update({_id: postId },
        {$push:{
          comments:
          {text: commentText,
          authorId: authorId,
          date: new Date()}
         }})
    },
	'testCreatePosts': function() {
		var jimId = Meteor.users.findOne({username: "jim"})._id;
		var instructorId = Meteor.users.findOne({username: "instructor"})._id;

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
    console.log(dates);
		for (i = 1; i <= 10; i++) {
			var id = jimId;
			if (i % 2 == 0) {
				id = instructorId;
			}
			Posts.insert({
				title: "Title " + i,
				text: "Text of the blog post.\n\n\n\nEnd of blog post.",
				authorId: id,
				date: dates[i - 1],
				comments: [
					{
						text: "Comment.",
						authorId: "otherId",
						date: dates[i - 1]
					},
          {
            text: "Comment.",
            authorId: "otherId",
            date: dates[i - 1]
          },
          {
            text: "Comment.",
            authorId: "otherId",
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
			"profilePicture": "x",
			"strengths": ['Arranger', 'Woo', 'Communication', 'Maximizer', 'Activator'],
			"description": "Teacher",
			"email": "Teacher@teacher.com",
			"userId": jimId
		});
		Instructor.insert({
			"name": "Zach",
			"profilePicture": "x",
			"strengths": ['Arranger', 'Woo', 'Communication', 'Maximizer', 'Activator'],
			"description": "Teacher",
			"email": "Teacher@teacher.com",
			"userId": instructorId
		});
		Student.insert({
			"name": "Johnny",
			"profilePicture": "x",
			"age": 15,
			"strengths": ['Input', 'Command', 'Restorative', 'Learner', 'Futuristic'],
			"description": "tall",
			"grade": '10th',
			"attendance": [true, false, true, true, false, false, true, true, false,
				true, true, false
			],
			"assignments": [{
				"name": "Java Work",
				"dateAssigned": new Date(),
				"dueDate": new Date(),
				"possiblePoints": 100,
				"pointsRecieved": 10,
				"instructor": "Zach"
			}, {
				name: "Java Work",
				dateAssigned: new Date(),
				dueDate: new Date(),
				possiblePoints: 100,
				pointsRecieved: 10,
				instructor: "Zach"
			}],
			"school": "West Dodge",
			"email": "ben@ben.com",
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
			"userId": studentId
		});
	},
	'createDefaultUser': function() {
		createDefaultUser();
	}
  });
    Meteor.publish('Assignments', function() {
        return Assignments.find();
    });

	Meteor.publish("Student", function() {
		return Student.find();
	});
	Meteor.publish("Teacher", function() {
		return Teacher.find();
	});
	//control update better
	Student.allow({
		update: function(userId, doc) {
			return true;
		}
	});

	Student.remove({});
	Instructor.remove({});
	for (var i = Student.find().count(); i < 5; i++) {
		Student.insert({
			"name": "Dash Wedergren " + i,
			"userId": "as879",
			"age": 16,
			"strengths": ['Input', 'Command', 'Restorative', 'Learner', 'Futuristic'],
			"description": "Programmer",
			"grade": '10',
			"attendance": [true, false, true, true, false, false, true, true, false,
				true, true, false
			],
			"assignments": [{
				"name": "Java Work",
				"dateAssigned": new Date(),
				"dueDate": new Date(),
				"possiblePoints": 100,
				"pointsRecieved": 10,
				"instructor": "Zach"
			}, {
				name: "Java Work",
				dateAssigned: new Date(),
				dueDate: new Date(),
				possiblePoints: 100,
				pointsRecieved: 10,
				instructor: "Zach"
			}],
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
      "picture": '8710339dcb6814d0d9d2290ef422285c9322b7163951f9a0ca8f883d3305286f44139aa374848e4174f5aada663027e4548637b6d19894aec4fb6c46a139fbf9.jpg'
		});
	}
	for (var i = Instructor.find().count(); i < 5; i++) {
		Instructor.insert({
			"name": "Zach Merrill " + i,
			"userId": "ad89",
			"strengths": ['Command', 'Relator', 'Analytical', 'Learner', 'Responsibility'],
			"description": "Teacher",
			"email": "zach_merrill@gallup.com",
      "picture": '8710339dcb6814d0d9d2290ef422285c9322b7163951f9a0ca8f883d3305286f44139aa374848e4174f5aada663027e4548637b6d19894aec4fb6c46a139fbf9.jpg'
		});
	}
	console.log(Student.findOne({
		"name": "Dash Wedergren 1"
	}));
	console.log(Instructor.findOne({
		"name": "Zach Merrill 1"
	}));
	createDefaultUser();
});
