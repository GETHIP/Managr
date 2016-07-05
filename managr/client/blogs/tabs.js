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
  }
});
