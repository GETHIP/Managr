import { Instructor } from '../../collections/instructor.js';
import { Drafts } from '../../collections/drafts.js';
import { Posts } from '../../collections/blogPosts.js';

Template.createBlogPost.onCreated(function() {
	Meteor.subscribe('Instructor');
	Meteor.subscribe('Drafts');
	if (FlowRouter.getRouteName() == "editDraft") {
		Template.instance().publicPost = Drafts.findOne({_id: FlowRouter.getParam("draft_id")}).isPublic;
	} else {
		Template.instance().publicPost = true;
	}
});

Template.createBlogPost.onRendered(function() {
	if(FlowRouter.getRouteName() == "editDraft"){
		var checkBox = document.getElementById('publicCheck');
		checkBox.checked = Template.instance().publicPost;
	}
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
			if(document.getElementById('createPostTitle').value == "" && document.getElementById('editor').innerHTML == ""){
				Modal.show("missingFields", "Please enter a title and body text before posting.");
			}
			if(document.getElementById('createPostTitle').value == ""){
				Modal.show("missingFields", "Please enter a title before posting.");
			}
			if(document.getElementById('editor').innerHTML == ""){
				Modal.show("missingFields", "Please enter body text before posting.");
			}

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
			if(document.getElementById('createPostTitle').value == "" && document.getElementById('scriptEditor').value == ""){
				Modal.show("missingFields", "Please enter a title and body text before posting.");
			}
			if(document.getElementById('createPostTitle').value == ""){
				Modal.show("missingFields", "Please enter a title before posting.");
			}
			if(document.getElementById('scriptEditor').value == ""){
				Modal.show("missingFields", "Please enter body text before posting.");
			}

		}
		
		Modal.show('publishPost', data);
	},
	'click .postButton.saveDraftButton':function(e) {

	},
	'click #publicCheck':function(e) {
		Template.instance().publicPost = !Template.instance().publicPost;
		isPublic = Template.instance().publicPost;
	},
	'click .saveDraftButton': function(event){
		var draftData;
		if (document.getElementById('editor') != undefined) {
		 	draftData = {
				title:document.getElementById('createPostTitle').value ,
				text: document.getElementById('editor').innerHTML,
				authorId: Meteor.user()._id,
				lastUpdated: new Date(),
				isPublic: Template.instance().publicPost,
			};
		} else {
			draftData = {
				title:document.getElementById('createPostTitle').value ,
				text: document.getElementById('scriptEditor').value,
				authorId: Meteor.user()._id,
				lastUpdated: new Date(),
				isPublic: Template.instance().publicPost,
			};
		}
			if (FlowRouter.getRouteName() == "createPost") {
				Meteor.call('createDraft', draftData);
			} else if (FlowRouter.getRouteName() == "editDraft"){
				Meteor.call('editDraft', draftData, FlowRouter.getParam("draft_id"));
			}
			FlowRouter.go("/managePosts")
	},
	'getIsPublic' : function(e){
		e.preventDefault();
		return Template.instance().publicPost;
	}
})


Template.publishPost.events({
  'click #publish': function(e){
		e.preventDefault();
		Meteor.call("insertPost", Template.instance().data);
		if(FlowRouter.getRouteName() == "editDraft"){
			Meteor.call("delDraft", FlowRouter.getParam("draft_id"));
		}
		FlowRouter.go("/");
	},
	'click #publicCheck':function(e) {
		Template.instance().publicPost = !Template.instance().publicPost;
	}
});

Template.missingFields.helpers({
	text: function() {
		return Template.instance().data;
	}
});
