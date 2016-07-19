import { Instructor } from '../../collections/instructor.js';

Template.createBlogPost.onCreated(function() {
	Meteor.subscribe('Instructor');
	Template.instance().publicPost = true;
});

Template.createBlogPost.events({
	'click .postButton.createPostButton':function(event) {
		event.preventDefault();
		var authorName = Instructor.findOne({userId: Meteor.user()._id}).name;
		var data = { };
		if (document.getElementById('editor') != undefined) {
			data = {
				title: document.getElementById('createPostTitle').value ,
				text: document.getElementById('editor').innerHTML,
				authorId: Meteor.user()._id,
				date: new Date(),
				comments: [],
				isPublic: Template.instance().publicPost,
				authorName: authorName
			};
		} else {
			data = {
				title:document.getElementById('createPostTitle').value ,
				text: document.getElementById('scriptEditor').value,
				authorId: Meteor.user()._id,
				date: new Date(),
				comments: [],
				isPublic: Template.instance().publicPost,
				authorName: authorName
			};
		}
		Modal.show('publishPostOrComment', data);
	},
	'click .postButton.saveDraftButton':function(e) {
		
	},
	'click #publicCheck':function(e) {
		Template.instance().publicPost = !Template.instance().publicPost;
		isPublic = Template.instance().publicPost;
	},
	'getIsPublic' : function(e){
		e.preventDefault();
		return Template.instance().publicPost;
	}
})


Template.publishPostOrComment.events({
  'click #publish': function(e){
		e.preventDefault();
		Meteor.call("insertPost", Template.instance().data);
		FlowRouter.go("/");
	},
	'click #publicCheck':function(e) {
		Template.instance().publicPost = !Template.instance().publicPost;
	}
})
