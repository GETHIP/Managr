import { Posts } from '../../collections/blogPosts.js';

Template.blogContent.helpers({
  //Returns Posts by Jim for non-logins
      publicPosts: function() {
        return Posts.find({authorId: {$eq: 1}}); //Set ID to Jim's Id (Always Public Posts)
      },
  //Returns all Blog Posts
      allPosts: function(){
        return Posts.find();
      }
});
