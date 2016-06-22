import { Posts } from '../../collections/blogPosts.js';

export function formatDatesOfPosts(posts){
  var newPosts = [];
  var newDate;
  var i;
  for (i = 0; i < posts.length; i++){
    newDate = moment(posts[i].date);
    var formattedDate = moment(newDate).format("M/D/YY");

    newPosts.push({
      date: formattedDate,
      title: posts[i].title,
      text: posts[i].text,
      authorId: posts[i].authorId,
      comments: posts[i].comments,
    });
  }
  return newPosts;
}

Template.blogContent.helpers({
  //Returns Posts by Jim for non-logins
      publicPosts: function() {
        return formatDatesOfPosts(Posts.find({authorId: {$eq: 1}})); //Set ID to Jim's Id (Always Public Posts)
      },
  //Returns all Blog Posts
      allPosts: function(){
        return formatDatesOfPosts(Posts.find().fetch());
      }
});
