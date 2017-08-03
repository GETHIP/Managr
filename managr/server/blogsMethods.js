import { Meteor } from 'meteor/meteor';
import { Posts } from '../collections/blogPosts.js';
import { Comments } from '../collections/comments.js';
import { Assignments } from '../collections/assignments.js';
import { Instructor } from '../collections/instructor.js';
import { Student } from '../collections/student.js';
import { Drafts } from '../collections/drafts.js';
import { isStudent, isInstructor, userIsValid, currentUserOrInstructor, nameOfUser } from '../lib/permissions.js';

export function blogsMethods() {
	Meteor.methods({
		'delDraft' : function(id) {
			Drafts.remove({"_id" : id, authorId: Meteor.user()._id});
		},
		'createDraft': function(draft) {
			if (!isInstructor()) {
				return;
			}
			draft.authorId = Meteor.user()._id;
			if (draft.title == "") {
				draft.title = "Untitled";
			}
			Drafts.insert(draft, {
				removeEmptyStrings: false
			});
		},
		'editDraft': function(draft, id) {
			if (draft.title == "") {
				draft.title = "Untitled";
			}
			Drafts.update({"_id": id, authorId: Meteor.user()._id}, {
				$set: {
					title: draft.title,
					text: draft.text,
					lastUpdated: draft.lastUpdated,
					isPublic: draft.isPublic
				}
			}, {
				removeEmptyStrings: false
			});
		},
		'updatePost': function(postId, text, title, vis) {
			Posts.update({_id: postId, authorId: Meteor.user()._id}, {
				$set: {
					text: text,
					isPublic: vis,
					title: title,
					lastUpdated: new Date()
				}
			});
		},
		'deleteComment': function(id, index) {
			var comments = Posts.findOne({"_id": id}).comments;
			var correctId = comments[index].authorId;
			if(currentUserOrInstructor(correctId)) {
				comments.splice(index, 1);
				Posts.update({"_id": id}, {$set : {comments : comments}});
			}
		},
		'delPost': function(id) {
			Posts.remove({"_id": id});
		},
		'insertPost':function(post){
			post.lastUpdated = new Date();
			Posts.insert(post);
		},
		'convertPostToDraft':function(postId) {
			//By also specifiying the user id of the current logged in user,
			//users cannot affect other users' posts.
			var post = Posts.findOne({_id: postId, authorId: Meteor.user()._id});
			if (post != undefined) {
				Posts.remove({_id: postId});
				Drafts.insert({
					title: post.title,
					text: post.text,
					lastUpdated: post.lastUpdated,
					authorId: post.authorId,
					isPublic: post.isPublic
				});
			}
		},
		'updateComment': function(postId, authorId, commentText) {
			if(!userIsValid() || authorId != Meteor.user()._id){
				return;
			}
			var authorName = nameOfUser(authorId);
			Posts.update({_id: postId }, {
				$push: {
					comments: {
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
