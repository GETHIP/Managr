// Template.createPost.onCreated(function() {
	// Meteor.subscribe('Instructor');
	// Template.instance().publicPost = true;
// });


// Template.createPost.events({
	// 'submit .postCreate':function(event){
		// event.preventDefault();
		// var isPublic = Template.instance().publicPost;
		// var authorName = Instructor.findOne({userId: Meteor.user()._id}).name;
		// if (Template.instance().useWYSIWYG.get()) {
			// Meteor.call("insertPost",{
			  // title: document.getElementById('createPostTitle').value ,
			  // text: document.getElementById('editor').innerHTML,
			  // authorId: Meteor.user()._id,
			  // date: new Date(),
			  // comments: [],
			  // isPublic: isPublic,
			  // authorName: authorName
			// });

		// }else{
		  // Meteor.call("insertPost",{
			// title:document.getElementById('createPostTitle').value ,
			// text: document.getElementById('create').value,
			// authorId: Meteor.user()._id,
			// date: new Date(),
			// comments: [],
			// isPublic: isPublic,
			// authorName: authorName
		  // });
		// }
	// },
	// 'click #publicCheck':function(e) {
		// Template.instance().publicPost = !Template.instance().publicPost;
	// }
// })
