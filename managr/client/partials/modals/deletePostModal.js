
Template.deletePost.events({
  'click .deletePostButton' : function(event){
    Meteor.call('delPost', Template.instance().data);
  }
});
