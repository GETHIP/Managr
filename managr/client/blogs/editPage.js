import { Instructor } from '../../collections/instructor.js';
import { Posts } from '../../collections/blogPosts.js';

Template.editPost.onCreated(function() {
	Meteor.subscribe('Instructor');
  Meteor.subscribe('Posts');
	Template.instance().publicPost = Posts.findOne({_id: FlowRouter.getParam("blog_id")}).isPublic;
});

Template.editPost.onRendered(function() {
	var checkBox = document.getElementById('publicCheck');
	checkBox.checked = Template.instance().publicPost;
});

Template.editPost.events({
	'submit .postCreate':function(event){
    event.preventDefault();
		var isPublic = Template.instance().publicPost;
		var authorName = Instructor.findOne({userId: Meteor.user()._id}).name;
		if (document.getElementById('editor') != undefined) {
      Meteor.call("updatePost", FlowRouter.getParam("blog_id"), document.getElementById('editor').innerHTML, document.getElementById('createPostTitle').value, isPublic);
		}else{
      Meteor.call("updatePost", FlowRouter.getParam("blog_id"), document.getElementById('scriptEditor').value, document.getElementById('createPostTitle').value, isPublic);
		}
		FlowRouter.go("/blogs/"+FlowRouter.getParam("blog_id"));
	},

	'click #publicCheck':function(e) {
		Template.instance().publicPost = !Template.instance().publicPost;
	}
});
