
Template.postComment.events({
  'click #publish' : function(event){
    event.preventDefault();
		Meteor.call("updateComment", FlowRouter.getParam("blog_id"), Meteor.userId(), Template.instance().data.text);
    Template.instance().data.clearEditor();

  }
})
