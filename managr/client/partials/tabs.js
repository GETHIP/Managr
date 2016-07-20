import { Instructor } from '../../collections/instructor.js';
import { Posts } from '../../collections/blogPosts.js';
import { Drafts } from '../../collections/drafts.js';


Template.tabs.onCreated(function() {
  Meteor.subscribe("Drafts");
  Template.instance().useWYSIWYG = new ReactiveVar(true);
  Session.blogPostText = "";
});

Template.tabs.helpers({
  useWYSIWYG: function() {
 return Template.instance().useWYSIWYG.get()
  },
});

Template.createField.onRendered(function() {
    document.getElementById('editor').innerHTML = Session.blogPostText;
});

Template.HTMLField.onRendered(function() {
    document.getElementById('scriptEditor').value = Session.blogPostText;
});

function responseFilter(draft) {
  return _id == FlowRouter.getParam("draft_id");
}

Template.tabs.onRendered(function() {
  document.getElementById('editor').innerHTML ="";
  document.getElementById('createPostTitle').value ="";
  if(FlowRouter.getRouteName() == "editPost"){
    document.getElementById('editor').innerHTML = Posts.findOne({_id: FlowRouter.getParam("blog_id")}).text;
    document.getElementById('createPostTitle').value = Posts.findOne({_id: FlowRouter.getParam("blog_id")}).title;
  }else if(FlowRouter.getRouteName() == "editDraft"){
    document.getElementById('editor').innerHTML = Drafts.findOne({_id: FlowRouter.getParam("draft_id")}).text;
    document.getElementById('createPostTitle').value = Drafts.findOne({_id: FlowRouter.getParam("draft_id")}).title;
  }
});
Template.tabs.events({

  'click .wysiwyg':function(event) {
    Template.instance().useWYSIWYG.set(true);
    Session.blogPostText = document.getElementById('scriptEditor').value;
  },
  'click .html':function(event) {
    Template.instance().useWYSIWYG.set(false);
    Session.blogPostText = document.getElementById('editor').innerHTML;
  },
});
