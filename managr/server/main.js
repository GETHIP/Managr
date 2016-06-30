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
		var adminId = Accounts.createUser({
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
		Roles.addUsersToRoles(adminId, 'instructor');
		Roles.addUsersToRoles(jimId, 'instructor');
		Roles.addUsersToRoles(studentId, 'student');
	},
	'createDefaultUser': function() {
		createDefaultUser();
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
			"name": "ben" + i,
			"profilePicture": "x",
			"age": 5,
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
			"userId": "asdof889a"
		});
	}
	for (var i = Instructor.find().count(); i < 5; i++) {
		Instructor.insert({
			"name": "roger" + i,
			"profilePicture": "x",
			"strengths": ['Command', 'Relator', 'Fun', 'Cool', 'Nice'],
			"description": "Teacher",
			"email": "Teacher@teacher.com",
			"userId": "asd34ai"
		});
	}
	console.log(Student.findOne({
		"name": "ben1"
	}));
	console.log(Instructor.findOne({
		"name": "roger1"
	}));
	createDefaultUser();
});
