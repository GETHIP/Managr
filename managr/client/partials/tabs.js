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
    document.getElementById('create').value = Session.blogPostText;
});

Template.tabs.onRendered(function() {
});

Template.tabs.events({

  'click .wysiwyg':function(event) {
    Template.instance().useWYSIWYG.set(true);
    Session.blogPostText = document.getElementById('create').value;
  },
  'click .html':function(event) {
    Template.instance().useWYSIWYG.set(false);
    Session.blogPostText = document.getElementById('editor').innerHTML;
  },
  'submit .postCreate':function(){

    if (Template.instance().useWYSIWYG.get()) {
        Meteor.call("insertPost",{
          title:"Will it Work" ,
          text: document.getElementById('editor').innerHTML,
          authorId: 12345,
          date: new Date(),
          comments: []
        });

    }else{
      Meteor.call("insertPost",{
        title:"Will it Work" ,
        text: document.getElementById('create').value,
        authorId: 12345,
        date: new Date(),
        comments: []
      });
    }
  }
});
