import { Instructor } from '../../collections/instructor.js';
import { Posts } from '../../collections/blogPosts.js';

Template.editPost.onCreated(function() {
	Meteor.subscribe('Instructor');
	  Meteor.subscribe('Posts');
	Template.instance().publicPost = Posts.find({_id: FlowRouter.getParam("blog_id")}).isPublic;
});

Template.editPost.events({
	'submit .postCreate':function(event){
    console.log("TYES");
    event.preventDefault();
		var isPublic = Template.instance().publicPost;
		var authorName = Instructor.findOne({userId: Meteor.user()._id}).name;
		if (document.getElementById('editor') != undefined) {
      console.log(FlowRouter.getParam("blog_id"));
      Meteor.call("updatePost", FlowRouter.getParam("blog_id"), document.getElementById('editor').innerHTML, document.getElementById('createPostTitle').value, isPublic);
		}else{
      console.log("it went 1");
      Meteor.call("updatePost", FlowRouter.getParam("blog_id"), document.getElementById('scriptEditor').value, document.getElementById('createPostTitle').value, isPublic);
		}
		console.log("its going");
		FlowRouter.go("/blogs/"+FlowRouter.getParam("blog_id"));
	},

	'click #publicCheck':function(e) {
		Template.instance().publicPost = !Template.instance().publicPost;
		console.log(Template.instance().publicPost);
	}
});
