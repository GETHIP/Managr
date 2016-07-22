import { Meteor } from 'meteor/meteor';
import { Posts } from '../collections/blogPosts.js';
import { Comments } from '../collections/comments.js';
import { Assignments } from '../collections/assignments.js';
import { Instructor } from '../collections/instructor.js';
import { Student } from '../collections/student.js';
import { Drafts } from '../collections/drafts.js';
import { userIsValid } from '../lib/permissions.js';

export function blogsMethods() {
	Meteor.methods({
		'delDraft' : function(id){
			Drafts.remove({"_id" : id});
		},
		'createDraft': function(draft){
			Drafts.insert(draft);
		},
		'editDraft': function(draft, id){
			Drafts.update({"_id": id}, {
				$set: {
					title: draft.title,
					text: draft.text,
					lastUpdated: draft.lastUpdated,
					isPublic: draft.isPublic
				}
			});
		},
		'updatePost': function(postId, text, title, vis){
			Posts.update({_id: postId}, {
				$set: {
					text: text,
					isPublic: vis,
					title: title,
					lastUpdated: new Date()
				}
			});
		},
		'deleteComment': function(id, index){
			var comments = Posts.findOne({"_id": id}).comments;
			var correctId = comments[index].authorId;
			if(correctId == Meteor.userId() || Roles.userIsInRole(Meteor.user()._id, "instructor")){
				comments.splice(index, 1);
				Posts.update({"_id": id}, {$set : {comments : comments}});
			}
		},
		'delPost': function(id){
		  correctId = Posts.findOne({"_id": id}).authorId;
		  if(correctId == Meteor.userId()){
			Posts.remove({"_id": id});
		  }
		},
		'insertPost':function(post) {
			post.lastUpdated = new Date();
			Posts.insert(post);
		},
		'updateComment': function(authorName, postId, authorId, commentText){
			if(!userIsValid()){
				return;
			}
			 Posts.update({_id: postId },
			{
			  $push: { comments:
				{
				  text: commentText,
				  authorId: authorId,
				  date: new Date(),
				  authorName: authorName
				}
			  }
			});
		},
	});
}