import { Instructor } from '../../collections/instructor.js';

Template.createBlogPost.onCreated(function() {
	Meteor.subscribe('Instructor');
	Template.instance().publicPost = true;
});


Template.createBlogPost.events({
	'submit .postCreate':function(event){
		event.preventDefault();
		var isPublic = Template.instance().publicPost;
		var authorName = Instructor.findOne({userId: Meteor.user()._id}).name;
		if (document.getElementById('editor') != undefined) {
			Meteor.call("insertPost",{
			  title: document.getElementById('createPostTitle').value ,
			  text: document.getElementById('editor').innerHTML,
			  authorId: Meteor.user()._id,
			  date: new Date(),
			  comments: [],
			  isPublic: isPublic,
			  authorName: authorName
			});

		}else{
		  Meteor.call("insertPost",{
			title:document.getElementById('createPostTitle').value ,
			text: document.getElementById('scriptEditor').value,
			authorId: Meteor.user()._id,
			date: new Date(),
			comments: [],
			isPublic: isPublic,
			authorName: authorName
		  });
		}
	},
	'click #publicCheck':function(e) {
		Template.instance().publicPost = !Template.instance().publicPost;
		console.log(Template.instance().publicPost);
	}
})