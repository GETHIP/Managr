Template.deletePost.events({
  'click .deletePostButton' : function(event){
    Meteor.call('delEvent', Template.instance().data);
  }
});
