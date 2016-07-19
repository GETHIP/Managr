import { Instructor } from '../../collections/instructor.js';

Template.createBlogPost.onCreated(function() {
	Meteor.subscribe('Instructor');
	if(FlowRouter.getRouteName() == editDraft){
	Template.instance().publicPost = Posts.findOne({_id: FlowRouter.getParam("blog_id")}).isPublic;
	}else{
	Template.instance().publicPost = true;
	}
});

Template.editPost.onRendered(function() {
	if(FlowRouter.getRouteName() == editDraft){
var checkBox = document.getElementById('publicCheck');
checkBox.checked = Template.instance().publicPost;
	}
});

Template.createBlogPost.events({
	'submit .postCreate':function(event){
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
	'click #publicCheck':function(e) {
		Template.instance().publicPost = !Template.instance().publicPost;
		isPublic = Template.instance().publicPost;
	},
	'click .saveDraft': function(event){
			draftDate = {
				title:,
				text:,
				authorId:,
				updated:,
				isPublic:,
			}
			if(FlowRouter.getRouteName() == "createPost"){
					Meteor.call('createDraft', draftData);
			}else if(FlowRouter.getRouteName() == "ediDraft"){
					Meteor.call('updateDraft', draftData, FlowRouter.getParam("draft_id"));
			}

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
