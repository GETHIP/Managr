import { Meteor } from 'meteor/meteor';
import { Posts } from '../collections/blogPosts.js';

Meteor.startup(() => {
  // code to run on server at startup
  Meteor.publish("Comments", function(){
    return Comments.find();
  });
  Posts.allow({
    'insert': function(userId, doc) {
      true;
    }
  });
  Meteor.methods({
    'insertPost':function(post) {
      Posts.insert(post);
      console.log(Posts.find().fetch());
    }
  })
});
