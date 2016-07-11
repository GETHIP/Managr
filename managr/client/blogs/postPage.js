import { Posts } from '../../collections/blogPosts.js';
import { Student } from '../../collections/student.js';
import { Instructor } from '../../collections/instructor.js';

function getName(id){
  insQ = Instructor.findOne({userId: id});
  stuQ = Student.findOne({userId: id});
  if(insQ != null){
    return insQ.name;
  }else if(stuQ != null){
    return stuQ.name;
  }
}


function userIsValid(){
    var isValid = true;
    if(Meteor.user() == null){
      isValid = false;
    }
    else if(Roles.userIsInRole(Meteor.user()._id, 'unconfirmed')){
      isValid = false;
    }
    return isValid;
}

UI.registerHelper("userIsValid", function(){
  return userIsValid();
})

export function formatDatesOfComments(comments) {
    var newComments = [];
    var newDate;
    var i;
    for (i = 0; i < comments.length; i++) {
        var commentColor = "";
        if (i % 2 == 0) {
            commentColor = "#eeeeee";
        } else {
            commentColor = "#dddddd";
        }
        newDate = moment(comments[i].date);
        var formattedDate = moment(newDate).format("MMMM D,  YYYY [at] H:mm A");
        newComments.push({
            date: formattedDate,
            text: comments[i].text,
            authorId: comments[i].authorId,
			authorName: comments[i].authorName,
            color: commentColor,
        });
    }
    return newComments;
}



Template.postPage.helpers({
	blogPost: function() {
		var blogId = FlowRouter.getParam("blog_id");
		var post = Posts.findOne({_id: blogId});
		newDate = moment(post.date);
		var formattedDate = moment(newDate).format("M/D/YY");
		var comments = formatDatesOfComments(post.comments);
		return {
			title: post.title,
			text: post.text,
			authorId: post.authorId,
			authorName: post.authorName,
			comments: comments,
			date: formattedDate
		}
	}


});

Template.postPage.events({
    'submit .submitComment': function(event) {
        event.preventDefault();
        Meteor.call("updateComment", getName(Meteor.userId()), FlowRouter.getParam("blog_id"), Meteor.userId() , event.target.comment.value);
        event.target.name.value = "";
        event.target.comment.value = "";
    }
});
