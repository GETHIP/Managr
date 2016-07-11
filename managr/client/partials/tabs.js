import { Instructor } from '../../collections/instructor.js';

Template.tabs.onCreated(function() {
  Meteor.subscribe('Instructor');
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
  'submit .postCreate':function(event){
    event.preventDefault();
    var isPublic = true;
    var checkValue = document.getElementById('publicCheck').value;
    if(checkValue == "on"){
      isPublic = true;
    }
    else{
      isPublic = false;
    }
    console.log(Instructor.find().fetch());
    var authorName = Instructor.findOne({userId: Meteor.user()._id}).name;
    console.log(authorName);
    if (Template.instance().useWYSIWYG.get()) {
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
        text: document.getElementById('create').value,
        authorId: Meteor.user()._id,
        date: new Date(),
        comments: [],
        isPublic: isPublic,
        authorName: authorName
      });
    }
  }
});
