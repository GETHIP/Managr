import { Posts } from '../../collections/blogPosts.js';

export function formatDatesOfComments(comments){
  var newComments = [];
  var newDate;
  var i;
  for (i = 0; i < comments.length; i++){
    newDate = moment(comments[i].date);
    var formattedDate = moment(newDate).format("MMMM D,  YYYY [at] H:mm A");
    newComments.push({
      date: formattedDate,
      text: comments[i].text,
      authorId: comments[i].authorId,
    });
  }
  console.log(newComments);
  return newComments;
}

Template.postPage.helpers({
      blogPost: function(){
        var blogId = FlowRouter.getParam("blog_id");
        var post = Posts.findOne({_id: blogId});
        newDate = moment(post.date);
        var formattedDate = moment(newDate).format("M/D/YY");
        return {
          title: post.title,
          text: post.text,
          authorId: post.authorId,
          comments: formatDatesOfComments(post.comments),
          date: formattedDate,
        }
      }
});
