import { Posts } from '../../collections/blogPosts.js';

Template.blogContent.helpers({
  //Returns Posts by Jim for non-logins
      publicPosts: function() {
        return Posts.find({authorId: {$eq: 1}}); //Set ID to Jim's Id (Always Public Posts)
      },
  //Returns all Blog Posts
      allPosts: function(){
        var posts = Posts.find().fetch();
        var newPosts = [];
        var newDate;
        var i;
        for (i = 0; i < posts.length; i++){
          newDate = moment(posts[i].date);
          moment(newDate).format("dddd, MMMM Do YYYY, h:mm:ss a");
          newPosts.push({
            date: newDate,
            title: posts[i].title,
            text: posts[i].text,
            authorId: posts[i].authorId,
            comments: posts[i].comments,
          });
        }
        return newPosts;
      }
});
