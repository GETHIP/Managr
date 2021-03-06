import { Instructor } from '../../collections/instructor.js';
import { Drafts } from '../../collections/drafts.js';
import { Posts } from '../../collections/blogPosts.js';

function displayModals(title, text) {
	if (title == "" && text == "") {
		Modal.show("missingFields", "Please enter a title and body text before posting.");
		return true;
	} else if (title == "") {
		Modal.show("missingFields", "Please enter a title before posting.");
		return true;
	} else if (text == "") {
		Modal.show("missingFields", "Please enter body text before posting.");
		return true;
	}
	return false;
}

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
			var title = document.getElementById('createPostTitle').value;
			var text = document.getElementById('editor').innerHTML;
			displayModals(title, text);
		} else {
			data = {
				title:document.getElementById('createPostTitle').value,
				text: document.getElementById('scriptEditor').value,
				authorId: Meteor.user()._id,
				date: new Date(),
				comments: [],
				isPublic: Template.instance().publicPost,
				authorName: authorName
			};
			var title = document.getElementById('createPostTitle').value;
			var text = document.getElementById('scriptEditor').value;
			displayModals(title, text);
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
			var title = document.getElementById('createPostTitle').value;
			var text = document.getElementById('editor').innerHTML;
			// if (displayModals(title, text)) {
				// return;
			// }
		 	draftData = {
				title:document.getElementById('createPostTitle').value ,
				text: document.getElementById('editor').innerHTML,
				authorId: Meteor.user()._id,
				lastUpdated: new Date(),
				isPublic: Template.instance().publicPost,
			};
		} else {
			var title = document.getElementById('createPostTitle').value;
			var text = document.getElementById('scriptEditor').value;
			// if (displayModals(title, text)) {
				// return;
			// }
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
		FlowRouter.go("/home/managePosts")
	},
	'getIsPublic' : function(e){
		e.preventDefault();
		return Template.instance().publicPost;
	}
})
