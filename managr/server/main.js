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
    'updateComment': function(authorId, commentText){
     Posts.update({_id:"2ZMjNPiNs85A4Fq48" },
        {$push:{
          comments:
          {text: commentText,
          authorId: authorId,
          date: new Date()}
         }})

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
	createDefaultUser();
});
