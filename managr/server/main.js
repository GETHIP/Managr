import { Meteor } from 'meteor/meteor';
import { Posts } from '../collections/blogPosts.js';
import { Comments } from '../collections/comments.js';

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

<<<<<<< HEAD
    }
=======
    },
	'testCreateUsers': function() {
		var adminId = Accounts.createUser({
			username: "instructor",
			password: "password",
		});
		var studentId = Accounts.createUser({
			username: "student",
			password: "password",
		});
		Roles.addUsersToRoles(adminId, 'instructor');
		Roles.addUsersToRoles(studentId, 'student');
		/*
		Meteor.users.find().forEach(function(user) {
			if (user.username == "admin") {
				Roles.addUsersToRole()
			} else if (user.username == "student") {
				
			}
		});
		*/
	}
>>>>>>> TestData
  })
});
