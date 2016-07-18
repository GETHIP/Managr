import { Instructor } from '../../collections/instructor.js';
import { Posts } from '../../collections/blogPosts.js';

Template.tabs.onCreated(function() {
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

Template.tabs.onRendered(function() {
    document.getElementById('editor').innerHTML ="";
    document.getElementById('createPostTitle').value ="";
    document.getElementById('editor').innerHTML = Posts.findOne({_id: FlowRouter.getParam("blog_id")}).text;
    document.getElementById('createPostTitle').value = Posts.findOne({_id: FlowRouter.getParam("blog_id")}).title;
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
