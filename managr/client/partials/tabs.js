Template.tabs.onCreated(function() {
  Template.instance().useWYSIWYG = new ReactiveVar(true);
});

Template.tabs.helpers({
  useWYSIWYG: function() {
 return Template.instance().useWYSIWYG.get()
  }
})

Template.tabs.events({
  'click .wysiwyg':function(event) {
    Template.instance().useWYSIWYG.set(true);
  },
  'click .html':function(event) {
    Template.instance().useWYSIWYG.set(false);
  },
  'submit .postCreate':function(){

    if (Template.instance().useWYSIWYG.get()) {
      var editor = document.getElementById('editor');
      console.log("Editor: " + editor.innerHTML);
        Meteor.call("updateComment", FlowRouter.getParam("blog_id"), event.target.name.value, event.target.comment.value);
      
    }else{
      var editor = document.getElementById('plainTextEditor');
      console.log("HTML: " + editor);
    }



    /*
    var postObject = {
      title: event.target.postTitle.value,
      text: event.target.create.value,
      authorId: "12165213541684",
      comments: [],
      date: new Date()
    }
    console.log(event.target.postTitle.value);
    Meteor.call('insertPost', postObject);*/
  }
});
