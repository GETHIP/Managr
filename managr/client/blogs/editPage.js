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
	'click .createPostButton':function(event){
		event.preventDefault();
		var isPublic = Template.instance().publicPost;
		var authorName = Instructor.findOne({userId: Meteor.user()._id}).name;
		if (document.getElementById('editor') != undefined) {
			if(document.getElementById('createPostTitle').value == "" && document.getElementById('editor').innerHTML == ""){
				Modal.show("missingFields", "Please enter a title and body text before posting.");
			} else if(document.getElementById('createPostTitle').value == ""){
				Modal.show("missingFields", "Please enter a title before posting.");
			} else if(document.getElementById('editor').innerHTML == ""){
				Modal.show("missingFields", "Please enter body text before posting.");
			} else {
				Meteor.call("updatePost", FlowRouter.getParam("blog_id"), document.getElementById('editor').innerHTML, document.getElementById('createPostTitle').value, isPublic);
				FlowRouter.go("/blogs/"+FlowRouter.getParam("blog_id"));
			}
		} else {
			if(document.getElementById('createPostTitle').value == "" && document.getElementById('scriptEditor').value == ""){
				Modal.show("missingFields", "Please enter a title and body text before posting.");
			} else if(document.getElementById('createPostTitle').value == ""){
				Modal.show("missingFields", "Please enter a title before posting.");
			} else if(document.getElementById('scriptEditor').value == ""){
				Modal.show("missingFields", "Please enter body text before posting.");
			} else {
				Meteor.call("updatePost", FlowRouter.getParam("blog_id"), document.getElementById('scriptEditor').value, document.getElementById('createPostTitle').value, isPublic);
				FlowRouter.go("/blogs/"+FlowRouter.getParam("blog_id"));
			}
		}
	},
	'click #publicCheck':function(e) {
		Template.instance().publicPost = !Template.instance().publicPost;
	},
	'click .saveDraftButton':function(event) {
		event.preventDefault();
		var blogId = FlowRouter.getParam("blog_id");
		FlowRouter.go("/home/managePosts");
		Meteor.call('convertPostToDraft', blogId);
	}
});
