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
		for (i = 1; i <= 10; i++) {
			var id = jimId;
			if (i % 2 == 0) {
				id = instructorId;
			}
			Meteor.call('insertPost', {
				title: "Title " + i,
				text: "Text of the blog post.\n\n\n\nEnd of blog post.",
				authorId: id,
				date: dates[i - 1],
				comments: [
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
	}
  })
});
