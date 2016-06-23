// Import meteor for server / publish and Assignments to publish
import { Meteor } from 'meteor/meteor';
import { Posts } from '../collections/blogPosts.js';
import { Comments } from '../collections/comments.js';
import { Assignments } from '../collections/assignments.js';

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

    }
  });
    Meteor.publish('Assignments', function() {
        return Assignments.find();
    });
});
