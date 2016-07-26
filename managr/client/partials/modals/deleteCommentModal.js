
Template.deleteComment.events({
  'click .deleteCommentButton': function(event){
    Meteor.call("deleteComment", Template.instance().data.blog_id, Template.instance().data.id);
  }
})
